export interface PresignedUrlResponse {
  url: string
  key: string
}

export interface UploadResult {
  success: boolean
  url: string
  originalFile: File
  error?: string
}

export interface UseS3UploadReturn {
  uploadImages: (files: File[], key?: string) => Promise<UploadResult[]>
  isUploading: boolean
  progress: number
  error?: string
}

export type DeviceType = "mobile" | "tablet" | "desktop";

export interface DeviceInfo {
  /** True when viewport width < 768px */
  isMobile: boolean;
  /** True when viewport width is 768px–1023px */
  isTablet: boolean;
  /** True when viewport width ≥ 1024px */
  isDesktop: boolean;
  /** One of "mobile" | "tablet" | "desktop" — useful for switch statements */
  deviceType: DeviceType;
  /** Raw viewport width in px (0 until hydrated) */
  width: number;
  /** False during SSR / before first paint; use to avoid hydration mismatches */
  isHydrated: boolean;
}
