import { $getRoot, $getSelection, $isRangeSelection } from 'lexical';
import type { EditorState } from 'lexical';

export const getEditorTextContent = (editorState: any): string => {
  try {
    const root = editorState.root;
    if (!root || !root.children) return '';
    
    const extractTextFromNode = (node: any): string => {
      // Handle text nodes
      if (node.text) {
        return node.text;
      }

      // Handle list items
      if (node.type === 'listitem') {
        const itemText = node.children
          .map((child: any) => extractTextFromNode(child))
          .join('');
        return `• ${itemText}`;
      }

      // Handle ordered list items
      if (node.type === 'list' && node.listType === 'number') {
        return node.children
          .map((child: any, index: number) => {
            const itemText = extractTextFromNode(child);
            return `${index + 1}. ${itemText}`;
          })
          .join('\n');
      }

      // Handle unordered lists
      if (node.type === 'list' && node.listType === 'bullet') {
        return node.children
          .map((child: any) => extractTextFromNode(child))
          .join('\n');
      }

      // Handle check lists
      if (node.type === 'list' && node.listType === 'check') {
        return node.children
          .map((child: any) => {
            const itemText = extractTextFromNode(child);
            return `☐ ${itemText}`;
          })
          .join('\n');
      }

      // Handle paragraphs and other container nodes
      if (node.children) {
        return node.children
          .map((child: any) => extractTextFromNode(child))
          .join('');
      }

      return '';
    };

    // Process all root children
    return root.children
      .map((node: any) => extractTextFromNode(node))
      .filter(Boolean)
      .join('\n');
  } catch (error) {
    console.error('Error getting text content:', error);
    return '';
  }
}; 