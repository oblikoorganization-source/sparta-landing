"use client";

/**
 * Android phones/tablets are the ones that choke on multiple simultaneous video
 * decoders — iOS handles the reel walls fine, so we degrade to poster-only on
 * Android specifically (not all touch devices). Media queries can't target an OS,
 * so this is a userAgent check, used only for a decorative fallback.
 */
export function isAndroid(): boolean {
  if (typeof navigator === "undefined") return false;
  return /android/i.test(navigator.userAgent);
}
