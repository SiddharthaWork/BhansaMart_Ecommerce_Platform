interface _twoButttonProps {
  firstButtonTitle?: string;
  firstButtonTitleColor?: string;
  firstButtonBg?: string;
  onFirstButtonClick?: () => void;
  secondButtonTitle: string;
  secondButtonBg: string;
  onSecondButtonClick?: () => void;
  secondButtonTitleColor: string;
}

export const _TwoButtons = ({
  firstButtonTitle,
  firstButtonBg,
  firstButtonTitleColor,
  secondButtonBg,
  secondButtonTitle,
  onFirstButtonClick,
  onSecondButtonClick,
  secondButtonTitleColor,
}: _twoButttonProps) => {
  console.log(firstButtonBg);
  return (
    <div className="flex place-items-center gap-4">
      <button
        className={`rounded py-3 px-2  w-fit`}
        onClick={onFirstButtonClick}
        style={{ backgroundColor: firstButtonBg, color: firstButtonTitleColor }}
      >
        {firstButtonTitle}
      </button>
      <button
        className={`rounded py-3 px-2  w-fit`}
        onClick={onSecondButtonClick}
        style={{
          backgroundColor: secondButtonBg,
          color: secondButtonTitleColor,
        }}
      >
        {secondButtonTitle}
      </button>
    </div>
  );
};
