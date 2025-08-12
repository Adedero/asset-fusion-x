import { writeFile, mkdir, unlink } from "fs/promises";
import { resolve, join } from "path";
import normalizeException from "~~/shared/helpers/normalize-exception";

type SaveUserIdDocumentResult = {
  filepath: string;
  filename: string;
  documentUrl: string;
};

type RemoveUserIdDocumentResult = {
  success: boolean;
  error: Error | null;
};

export async function saveUserIdDocument(
  userId: string,
  base64Data: string,
  extension: string,
  outputDir = resolve("public/documents/users"),
): Promise<{ data: SaveUserIdDocumentResult | null; error: Error | null }> {
  const base64 = base64Data.replace(/^data:.*;base64,/, "");

  const buffer = Buffer.from(base64, "base64");
  const filename = `${userId}-${Date.now()}.${extension}`;
  const filepath = join(outputDir, filename);

  try {
    await mkdir(outputDir, { recursive: true });
    await writeFile(filepath, buffer);

    const documentUrl = `${process.env.BASE_URL}/documents/users/${filename}`;

    return {
      data: { filepath, filename, documentUrl },
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: normalizeException(error),
    };
  }
}

export async function removeUserIdDocument(
  documentUrl: string,
  outputDir = resolve("public/documents/users"),
): Promise<RemoveUserIdDocumentResult> {
  try {
    const filename = documentUrl.split("/").pop();
    if (!filename) throw new Error("Invalid document URL");

    const filepath = join(outputDir, filename);
    await unlink(filepath);

    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: normalizeException(error) };
  }
}
