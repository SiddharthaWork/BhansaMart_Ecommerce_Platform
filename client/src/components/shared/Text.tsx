import classname from "classnames";
import React from "react";

type HTMLTags =
  | "p"
  | "div"
  | "span"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "section"
  | "article"
  | "header"
  | "footer"
  | "aside";

interface propTypes
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  as?: HTMLTags;
  children: React.ReactNode;
  size?:
  | "body-lg-sm"
  | "body-lg-mid"
  | "body-lg-default"
  | "body-lg-lg"
  | "body-lg-rare"
  | "body-md-sm"
  | "body-md-mid"
  | "body-md-default"
  | "body-md-lg"
  | "body-md-rare"
  | "body-base-sm"
  | "body-base-mid"
  | "body-base-default"
  | "body-base-lg"
  | "body-base-rare"
  | "body-sm-sm"
  | "body-sm-mid"
  | "body-sm-default"
  | "body-sm-lg"
  | "body-sm-rare"
  | "body-xm-sm"
  | "body-xm-mid"
  | "body-xm-default"
  | "body-xm-lg"
  | "body-xm-rare"
  | "body-xs-sm"
  | "body-xs-mid"
  | "body-xs-default"
  | "body-xs-lg"
  | "body-xs-rare";

  variant?:
  | "default"
  | "fade-black"
  | "white"
  | "grey"
  | "fade-grey"
  | "grey-500"
  | "grey-400"
  | "secondary"
  | "strong-secondary"
  | "fade-secondary"
  | "camarone"
  | "brown"
  | "fade-blue"
  | "darkish-blue";
  text?: string;
  className?: string;
}

export const Text = React.memo(
  ({
    as: Component = "p",
    size = "body-lg-default",
    children,
    variant = "default",
    className,
    text,
    ...other
  }: propTypes) => {
    return (
      <Component
        className={classname(`${className}`, {
          //----------Size & FONT WEIGHT------------//
          //------------- rare or 700px  font with different sizes-----------------//
          "text-[24px] font-bold": size === "body-lg-rare",
          "text-[18px] font-bold": size === "body-md-rare",
          "text-[16px] font-bold": size == "body-base-rare",
          "text-[14px] font-bold": size === "body-sm-rare",
          "text-[12px] font-bold": size === "body-xs-rare",
          //-------------End of rare or 700px  font-----------------//

          //------------- lg or 600px  font with different sizes-----------------//
          "text-[24px] font-semibold": size === "body-lg-lg",
          "text-[18px] font-semibold": size === "body-md-lg",
          "text-[16px] font-semibold": size == "body-base-lg",
          "text-[14px] font-semibold": size === "body-sm-lg",
          "text-[12px] font-semibold": size === "body-xs-lg",

          //-------------End of lg or 600px  font-----------------//

          //------------- Default or 500px  font with different sizes-----------------//
          "text-[24px] font-medium": size === "body-lg-default",
          "text-[18px] font-medium": size === "body-md-default",
          "text-[16px] font-medium": size == "body-base-default",
          "text-[14px] font-medium": size === "body-sm-default",
          "text-[12px] font-medium": size === "body-xs-default",

          //-------------End of Default or 500px  font-----------------//

          //------------- mid or 400px  & font with different sizes-----------------//
          "text-[24px] font-normal": size === "body-lg-mid",
          "text-[18px] font-normal": size === "body-md-mid",
          "text-[16px] font-normal": size == "body-base-mid",
          "text-[14px] font-normal": size === "body-sm-mid",
          "text-[12px] font-normal": size === "body-xs-mid",
          //-------------End of mid or 700px  font-----------------//

          //------------- sm or 300px  & font with different sizes-----------------//
          "text-[24px] font-light": size === "body-lg-sm",
          "text-[18px] font-light": size === "body-md-sm",
          "text-[16px] font-light": size == "body-base-sm",
          "text-[14px] font-light": size === "body-sm-sm",
          "text-[12px] font-light": size === "body-xs-sm",
          //-------------End of sm or 300px  font-----------------//

          //--------------------END of Size & FONT WEIGHT-------------------------//

          //----------color------------//
          "text-white": variant == "white",
          "text-black": variant == "default",
          "text-fade-black": variant == "fade-black",
          "text-grey": variant == "grey",
          "text-fade-grey": variant == "fade-grey",
          "text-grey-500": variant == "grey-500",
          "text-grey-400": variant == "grey-400",
          "text-secondary": variant == "secondary",
          "text-strong-secondary": variant == "strong-secondary",
          "text-fade-secondary": variant == "fade-secondary",
          "text-camarone": variant == "camarone",
          "text-brown": variant == "brown",
          "text-fade-blue": variant == "fade-blue",
          "text-darkish-blue": variant == "darkish-blue",
          //----------End of color------------//
        })}
        {...other}
      >
        {text || children}
      </Component>
    );
  }
);
