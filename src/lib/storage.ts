import { createServerClient } from "@/lib/supabase/server";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Validate a file before upload.
 */
export function validateFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return "File type not allowed. Use JPEG, PNG, or WebP.";
  }
  if (file.size > MAX_FILE_SIZE) {
    return "File too large. Maximum size is 5MB.";
  }
  return null;
}

/**
 * Upload a file to Supabase Storage.
 */
export async function uploadFile(
  bucket: string,
  file: File,
  path: string
): Promise<UploadResult> {
  const validationError = validateFile(file);
  if (validationError) {
    return { success: false, error: validationError };
  }

  const supabase = await createServerClient();

  // Generate unique filename
  const ext = file.name.split(".").pop();
  const fileName = `${path}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    return { success: false, error: error.message };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(fileName);

  return { success: true, url: publicUrl };
}

/**
 * Delete a file from Supabase Storage.
 */
export async function deleteFile(
  bucket: string,
  path: string
): Promise<void> {
  const supabase = await createServerClient();
  await supabase.storage.from(bucket).remove([path]);
}
