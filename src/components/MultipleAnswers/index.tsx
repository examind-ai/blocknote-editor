// Reason why we use default exports for Block and NodeView while we used named export for insertMultipleAnswers according to ChatGPT o3-mini-high:
//
// Using default exports for your block spec, node definition,
// and node view (which are the main things defined in their respective files)
// and a named export for an insertion command like insertMultipleAnswers
// is a common and acceptable pattern. This approach helps clarify which export
// is the primary component of a module (default) versus supporting utilities or commands (named),
// and it works well with auto-completion and explicit imports.

export { default as MultipleAnswersBlock } from './Block';
export { default as MultipleAnswersNodeView } from './NodeView';

export { insertMultipleAnswers } from './insertMultipleAnswers';
