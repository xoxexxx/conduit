import { Icon28AccessibilityOutline } from "@vkontakte/icons";
export const FooterBar = () => {
  return (
    <div className="footer">
      <div>
        <span>
          conduit © 2022. An interactive learning project from Thinkster. Code
          licensed under MIT.{" "}
        </span>
        <span>
          <Icon28AccessibilityOutline />{" "}
          <a target="_blank" href="https://github.com/xoxexxx">
            https://github.com/xoxexxx
          </a>{" "}
        </span>
      </div>
    </div>
  );
};
