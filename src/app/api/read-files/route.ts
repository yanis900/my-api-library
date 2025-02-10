import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { files }: { files: { name: string; content: string }[] } = body;

    let fileContent = "";
    for (const file of files) {
      fileContent += `\n\n==> ${file.name}\n${file.content}`;
    }

    return NextResponse.json({ content: fileContent }, { status: 200 });
  } catch (error) {
    console.error("Error processing files:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
