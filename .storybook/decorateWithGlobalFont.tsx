import type { ComponentType } from "react";
import type { NextFontWithVariable } from "next/dist/compiled/@next/font";

type FontProps = {
  variable: string;
  font: NextFontWithVariable;
};

/**
 * In storybook, we can't easily set the className on html nor body element.
 * Here we render a <style /> which will set a global (:root) CSS variable.
 */
function StyleGlobalFontVariable({ variable, font }: FontProps) {
  return <style>{`:root { ${variable}: "${font.style.fontFamily}"; }`}</style>;
}

export function decorateWithGlobalFont(font: FontProps) {
  const GlobalFontStyle = (Story: ComponentType) => (
    <>
      <StyleGlobalFontVariable {...font} />
      <Story />
    </>
  );

  return GlobalFontStyle;
}
