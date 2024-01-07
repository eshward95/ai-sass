import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("c07dfd24-a458-4ab0-b4b3-4ad31c1644b9");
    //   <script type="text/javascript">window.$crisp=[];window.CRISP_WEBSITE_ID="c07dfd24-a458-4ab0-b4b3-4ad31c1644b9";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();</script>
    return () => {};
  }, []);
  return null;
};
