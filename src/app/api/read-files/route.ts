import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { files }: { files: { webkitRelativePath: string }[] } = body;

    let fileContent = "";

    for (const file of files) {
      const fullPath = path.join(process.cwd(), file.webkitRelativePath);
      const data = await fs.promises.readFile(fullPath, "utf8");
      fileContent += data + "\n";
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
