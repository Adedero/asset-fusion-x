import { writeFile, mkdir, unlink } from "fs/promises";
import { resolve, join } from "path";
import normalizeException from "~~/shared/helpers/normalize-exception";

type SaveUserImageReturnType = {
  error: Error | null;
  data: {
    filepath: string;
    filename: string;
    imageUrl: string;
  } | null;
};

export async function saveUserImage(
  userId: string,
  base64Image: string,
  outputDir = resolve("public/uploads/img/users"),
): Promise<SaveUserImageReturnType> {
  const matches = base64Image.match(/^data:(.+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    return { data: null, error: new Error("Invalid base64 string") };
  }

  const mimeType = matches[1];
  const base64Data = matches[2];
  const buffer = Buffer.from(base64Data, "base64");

  const extension = mimeType.split("/")[1];
  const filename = `${userId}-${Date.now()}.${extension}`;
  const filepath = join(outputDir, filename);

  try {
    await mkdir(outputDir, { recursive: true });
    await writeFile(filepath, buffer);

    const imageUrl = `${process.env.BASE_URL}/uploads/img/users/${filename}`;

    return {
      data: {
        filepath,
        filename,
        imageUrl,
      },
      error: null,
    };
  } catch (error) {
    return { data: null, error: normalizeException(error) };
  }
}

/**
 * Removes a user image file from disk.
 *
 * @param imageUrl - The full public URL to the image.
 * @param outputDir - The absolute path to the image storage directory.
 */
export async function removeUserImage(
  imageUrl: string,
  outputDir = resolve("public/uploads/img/users"),
): Promise<{ success: boolean; error: Error | null }> {
  try {
    // Extract the filename from the imageUrl
    const filename = imageUrl.split("/").pop();
    if (!filename) {
      throw new Error("Invalid image URL: No filename found.");
    }

    // Construct the full file path
    const filePath = join(outputDir, filename);

    // Attempt to remove the file
    await unlink(filePath);

    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: normalizeException(error) };
  }
}
