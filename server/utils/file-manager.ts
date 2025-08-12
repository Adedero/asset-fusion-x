import { join, resolve } from "node:path";
import { writeFile, mkdir, unlink } from "fs/promises";
import normalizeException from "~~/shared/helpers/normalize-exception";

export interface SaveFileResultData {
  path: string;
  name: string;
  url: string;
}

export interface SaveFileResult {
  data: SaveFileResultData | null;
  error: Error | null;
}

export interface SaveFileOptions {
  id: string;
  base64Data: string;
  extension: string;
  outputDir: string;
}

// outputDir: format public/<path>/<path>

export async function saveFile(
  options: SaveFileOptions,
): Promise<SaveFileResult> {
  const { id, base64Data, extension, outputDir } = options;

  const base64 = base64Data.replace(/^data:.*;base64,/, "");

  const buffer = Buffer.from(base64, "base64");
  const filename = `${id}-${Date.now()}.${extension}`;
  const filepath = resolve(join(outputDir, filename));

  try {
    await mkdir(resolve(outputDir), { recursive: true });
    await writeFile(filepath, buffer);

    let urlPath = outputDir;
    if (urlPath.startsWith("public/")) {
      urlPath = urlPath.slice("public/".length);
    } else if (urlPath === "public") {
      urlPath = "";
    }
    urlPath = urlPath.replace(/^\/+/, "");
    const documentUrl = `${process.env.BASE_URL}/${
      urlPath ? urlPath + "/" : ""
    }${filename}`;

    return {
      data: { path: filepath, name: filename, url: documentUrl },
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: normalizeException(error),
    };
  }
}

export interface RemoveFileResult {
  success: boolean;
  error: Error | null;
}

export async function removeFile(filePath: string): Promise<RemoveFileResult> {
  try {
    await unlink(filePath);
    return {
      success: true,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      error: normalizeException(error),
    };
  }
}

export async function removeFileByUrl(url: string): Promise<RemoveFileResult> {
  try {
    const baseUrl = process.env.BASE_URL || "";
    const relativePath = url.replace(baseUrl, "").replace(/^\/+/, ""); // remove domain and leading slash
    const fullPath = resolve("public", relativePath); // reconstruct full path

    await unlink(fullPath);

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      error: normalizeException(error),
    };
  }
}
