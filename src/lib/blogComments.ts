export const BLOG_AUTHOR_EMAIL = "phdprogrammer.official@gmail.com";

export function isBlogAuthorEmail(email?: string | null) {
  return typeof email === "string" && email.trim().toLowerCase() === BLOG_AUTHOR_EMAIL;
}
