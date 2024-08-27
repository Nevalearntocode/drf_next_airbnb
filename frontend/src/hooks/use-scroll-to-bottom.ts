export default function useScrollToBottom() {
  const scrollToBottom = (ref: React.RefObject<HTMLDivElement>) => {
    setTimeout(() => {
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    }, 100);
  };

  return scrollToBottom;
}
