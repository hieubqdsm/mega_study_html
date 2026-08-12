// Neutralized for the offline / GitHub Pages mirror.
// The original feedback widget (rating + feedback-areas) posts to Unity's
// backend, which is unreachable from a static host, and it injected assets
// via root-absolute URLs ("/StaticFilesConfig/feedback/...") that 404 under
// a subpath deploy. Original kept alongside as feedback.js.original.
// No-op: define any globals the page might reference, do nothing else.
window.InitFeedback = function () {};
window.feedback = window.feedback || {};
