import { toast } from "sonner";

export interface DownloadOptions {
  filename?: string;
  onStart?: () => void;
  onSuccess?: (filename: string) => void;
  onError?: (error: Error) => void;
  onComplete?: () => void;
  t?: (key: string) => string; // 国际化翻译函数
}

export async function downloadImage(
  imageUrl: string,
  options: DownloadOptions = {}
): Promise<void> {
  if (!imageUrl) {
    throw new Error("No image URL provided");
  }

  const { filename, onStart, onSuccess, onError, onComplete, t } = options;

  try {
    onStart?.();

    // Generate filename
    let finalFilename = filename;
    if (!finalFilename) {
      const timestamp = new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/[:-]/g, "");
      const extension = getImageExtension(imageUrl);
      finalFilename = `gempix2-${timestamp}.${extension}`;
    }

    console.log("🚀 Starting download...");

    let blob: Blob;

    try {
      // 首先尝试直接下载
      console.log("Attempting direct download...");
      const response = await fetch(imageUrl, { mode: "cors" });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      blob = await response.blob();
      console.log("✅ Direct download successful");
    } catch (directError) {
      // 如果直接下载失败（CORS 错误），使用代理
      console.warn("Direct download failed, using proxy:", directError);
      console.log("Attempting proxy download...");

      const proxyUrl = `/api/proxy-download?url=${encodeURIComponent(imageUrl)}`;
      const proxyResponse = await fetch(proxyUrl);

      if (!proxyResponse.ok) {
        throw new Error(`Proxy download failed: ${proxyResponse.status}`);
      }

      blob = await proxyResponse.blob();
      console.log("✅ Proxy download successful");
    }

    // 创建下载链接
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = finalFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(blobUrl);

    toast.success(
      t?.("image_download_success") || `Image downloaded as "${finalFilename}"`
    );
    onSuccess?.(finalFilename);
  } catch (error) {
    console.error("Download error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Failed to download image";
    toast.error(t?.("download_failed") || `Download failed: ${errorMessage}`);

    if (error instanceof Error) {
      onError?.(error);
    } else {
      onError?.(new Error(errorMessage));
    }
  } finally {
    onComplete?.();
  }
}

function getImageExtension(url: string, contentType?: string | null): string {
  // Try to get extension from content type first
  if (contentType) {
    if (contentType.includes("png")) return "png";
    if (contentType.includes("webp")) return "webp";
    if (contentType.includes("gif")) return "gif";
    if (contentType.includes("jpeg") || contentType.includes("jpg"))
      return "jpg";
  }

  // Fallback to URL analysis
  if (url.includes(".png")) return "png";
  if (url.includes(".webp")) return "webp";
  if (url.includes(".gif")) return "gif";
  if (url.includes(".jpeg") || url.includes(".jpg")) return "jpg";

  // Default fallback
  return "jpg";
}

export function generateImageFilename(
  prefix: string = "gempix2",
  type: "generated" | "edited" = "generated"
): string {
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, "");
  return `${prefix}-${type}-${timestamp}`;
}

/**
 * Simple image viewing function - open image in new tab
 */
export function viewImage(
  imageUrl: string,
  t?: (key: string) => string
): void {
  if (!imageUrl) {
    toast.error(t?.("no_image_url") || "No image URL provided");
    return;
  }

  console.log("🖼️ Opening image in new tab:", imageUrl);

  const newWindow = window.open(imageUrl, "_blank", "noopener,noreferrer");

  if (newWindow) {
    toast.success(t?.("image_opened") || "Image opened in new tab");
  } else {
    // If popup is blocked, try using anchor tag
    const link = document.createElement("a");
    link.href = imageUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(t?.("image_opened") || "Image link opened");
  }
}
