interface MarkdownProps {
  content: string;
}

export const Markdown: React.FC<MarkdownProps> = ({ content }) => {
  return (
    <div
      className={`hyphens-none text-base pt-2 pb-10 md:pb-0 w-full max-w-none w-1/2 gap-8 lg:overflow-y-hidden px-5 break-inside-auto font-extralight
      
      prose 
      
      prose-headings:text-xl prose-headings:break-after-avoid prose-headings:text-white prose-headings:font-light

      prose-strong:text-white prose-strong:font-medium
      
      prose-p:text-white prose-p:w-full prose-p:mb-5 prose-p:
      
      prose-img:max-h-[400px] md:prose-img:max-h-[70vh] lg:prose-img:max-h-auto prose-img:flex prose-img:items-center prose-img:justify-center prose-img:w-full prose-img:object-contain prose-img:break-after-avoid

      prose-a:text-[#FF00FF] prose-a:underline
      
      prose-hr:border-t prose-hr:border-[#00000055]

      prose-li:text-black
      
      `}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
