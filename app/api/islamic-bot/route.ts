import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const cronSecret = process.env.ISLAMIC_BOT_CRON_SECRET;
const botUserId = "9e4ce9aa-5928-4940-bb25-bb0bd80a71d8";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const providedSecret = searchParams.get("key");

    if (!cronSecret || providedSecret !== cronSecret) {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: "Supabase server environment variables are missing." },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const { data: content, error: contentError } = await supabase
      .from("islamic_bot_content")
      .select(
        "id, title, content, source, source_url, content_type, last_posted_at"
      )
      .eq("active", true)
      .order("last_posted_at", { ascending: true, nullsFirst: true })
      .limit(1)
      .maybeSingle();

    if (contentError) {
      return NextResponse.json(
        { error: contentError.message },
        { status: 500 }
      );
    }

    if (!content) {
      return NextResponse.json({
        success: false,
        message: "No active bot content available.",
      });
    }

    const postContent = [
      `📖 ${content.title}`,
      "",
      content.content,
      "",
      `📚 المصدر: ${content.source}`,
      content.source_url ? `🔗 ${content.source_url}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const { data: post, error: postError } = await supabase
      .from("community_posts")
      .insert({
        user_id: botUserId,
        content: postContent,
        post_type: "text",
        file_path: null,
        file_name: null,
        file_size: null,
        mime_type: null,
        link_url: null,
      })
      .select("id")
      .single();

    if (postError) {
      return NextResponse.json(
        { error: postError.message },
        { status: 500 }
      );
    }

    const { error: updateError } = await supabase
      .from("islamic_bot_content")
      .update({
        last_posted_at: new Date().toISOString(),
      })
      .eq("id", content.id);

    if (updateError) {
      return NextResponse.json(
        {
          success: true,
          post_id: post.id,
          warning: updateError.message,
        },
        { status: 200 }
      );
    }

    const { error: logError } = await supabase
      .from("islamic_bot_post_log")
      .insert({
        content_id: content.id,
        post_id: post.id,
      });

    if (logError) {
      return NextResponse.json(
        {
          success: true,
          post_id: post.id,
          warning: logError.message,
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      success: true,
      post_id: post.id,
      content_id: content.id,
      message: "Islamic bot post created successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unknown server error.",
      },
      { status: 500 }
    );
  }
}