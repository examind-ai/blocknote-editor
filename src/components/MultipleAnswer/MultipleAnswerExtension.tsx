import { Extension } from '@tiptap/core';

// MultipleAnswerExtension.ts
export const MultipleAnswerExtension = Extension.create({
  name: 'BlockNoteMultipleAnswerExtension',

  addKeyboardShortcuts() {
    return {
      Enter: () => {
        const { selection } = this.editor.state;
        const { $head } = selection;

        // Check if we're in a multiple answer option
        if ($head.parent.type.name === 'multipleAnswerOption') {
          // Add new option
          this.editor.commands.insertContentAt($head.after(), {
            type: 'multipleAnswerOption',
          });
          return true;
        }
        return false;
      },

      Backspace: () => {
        const { selection } = this.editor.state;
        const { $head } = selection;
        const node = $head.parent;

        // Only delete empty options
        if (
          node.type.name === 'multipleAnswerOption' &&
          node.textContent === '' &&
          $head.parentOffset === 0
        ) {
          this.editor.commands.deleteNode('multipleAnswerOption');
          return true;
        }
        return false;
      },
    };
  },
});
