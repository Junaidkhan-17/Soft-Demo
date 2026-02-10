import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, redirect } from "@remix-run/node";
import { RemixServer, useLocation, Outlet, Meta, Links, ScrollRestoration, Scripts, Link } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import Aos from "aos";
import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { FaArrowUp, FaLinkedinIn, FaXTwitter, FaYoutube, FaInstagram, FaAngleDown, FaArrowRight, FaBarsStaggered, FaXmark, FaRegEnvelope, FaCheck, FaFacebookF, FaGooglePlusG, FaAnglesLeft, FaAnglesRight, FaStar, FaArrowLeft, FaMagnifyingGlass } from "react-icons/fa6";
import { Container, Row, Col, Tab, Form, Button, Accordion } from "react-bootstrap";
import { FiPhone } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";
import Slider from "react-slick";
import VanillaTilt from "vanilla-tilt";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error2) {
          reject(error2);
        },
        onError(error2) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error2);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error2) {
          reject(error2);
        },
        onError(error2) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error2);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const logo = "data:image/png;base64,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";
const ScrollToTop = () => {
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  const pathname = location.pathname;
  const isWhiteVariant = pathname === "/home-7" || pathname === "/single/home-7";
  const hiddenPaths = ["/error", "/account", "/login", "/forgot", "/reset", "/verify", "/form-success"];
  const shouldHideButton = hiddenPaths.some((path) => pathname == null ? void 0 : pathname.startsWith(path));
  useEffect(() => {
    if (shouldHideButton) return;
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = scrollTop / docHeight * 100;
      setProgress(scrollPercentage);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shouldHideButton]);
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  if (shouldHideButton) return null;
  return /* @__PURE__ */ jsx("div", { className: `progress-wrap ${progress > 4 ? "active-progress" : ""} ${isWhiteVariant ? "white-scroll-btn" : ""}`, onClick: goToTop, children: /* @__PURE__ */ jsxs("div", { className: "position-relative", children: [
    /* @__PURE__ */ jsx("svg", { className: "progress-circle position-relative z-10 svg-content", width: "100%", height: "100%", viewBox: "-1 -1 102 102", children: /* @__PURE__ */ jsx("path", { d: "M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98", strokeDasharray: "307", strokeDashoffset: 307 - progress / 100 * 307 }) }),
    /* @__PURE__ */ jsx("div", { className: "position-absolute top-50 start-50 z-20 translate-middle arrow", children: /* @__PURE__ */ jsx(FaArrowUp, { size: 18 }) })
  ] }) });
};
const links = () => [{ rel: "icon", type: "image/x-icon", href: logo }];
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
    Aos.init({
      once: true
    });
  }, []);
  if (!hydrated) return null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(ScrollToTop, {})
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App,
  links
}, Symbol.toStringTag, { value: "Module" }));
const CTA$3 = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "cta2-area",
        style: {
          //backgroundImage: `url(${bgImage})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        },
        children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 6, className: "m-auto text-center", children: /* @__PURE__ */ jsxs("div", { className: "headding2-w", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-anime-style-3", children: "Join 500,000+ SEO's Who Trust WebDock Studio For Insights That Help Their Business Grow." }),
          /* @__PURE__ */ jsx("div", { className: "space16" }),
          /* @__PURE__ */ jsx("p", { "data-aos": "fade-up", "data-aos-duration": "800", children: "WebDock Studio has exceeded our expectations in every way. The ease with & which we can target specific audience segments has an transform." }),
          /* @__PURE__ */ jsx("div", { className: "space30" }),
          /* @__PURE__ */ jsx("div", { className: "", "data-aos": "fade-up", "data-aos-duration": "1000", children: /* @__PURE__ */ jsx(Link, { to: "/account", className: "theme-btn3", children: "Get Started For Free" }) })
        ] }) }) }) })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "cta2-main-image", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 12, children: /* @__PURE__ */ jsxs("div", { className: "cta2-images", children: [
      /* @__PURE__ */ jsx("div", { className: "img1" }),
      /* @__PURE__ */ jsx("div", { className: "shape1" }),
      /* @__PURE__ */ jsx("div", { className: "shape2" })
    ] }) }) }) }) })
  ] });
};
const Webdock = "/assets/webdockLogo-CAKv0pm5.jpeg";
const Loader = () => {
  return /* @__PURE__ */ jsx("div", { className: "overlay flex cac vac preloader-parent", children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "loader preloader flex vac", children: [
    /* @__PURE__ */ jsxs("svg", { width: "200", height: "200", children: [
      /* @__PURE__ */ jsx("circle", { className: "background", cx: "90", cy: "90", r: "80", transform: "rotate(-90, 100, 90)" }),
      /* @__PURE__ */ jsx("circle", { className: "outer", cx: "90", cy: "90", r: "80", transform: "rotate(-90, 100, 90)" })
    ] }),
    /* @__PURE__ */ jsx("span", { className: "circle-background" }),
    /* @__PURE__ */ jsx("span", { className: "logo animated fade-in", children: /* @__PURE__ */ jsx("img", { src: Webdock, alt: "Logo" }) })
  ] }) }) });
};
const footerIcon1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAoCAYAAABjPNNTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKFSURBVHgB7ViLcdswDIWzQN0NuEG0QTVCRvAG9QZWJog6gbNBs4HaCdRMIG0gdwKUPEEpRIMQJCufS/LucKZMEHwERAIiwCc+EDawAhBx63+COPb3abPZ/IHXhCeWeTl4qVFH6L/z4uCl4CfLvVS4DNUSsuZwU0gPXvZR18nLg5dHarfwP/TfvGQwfg0CSi+3/nU4wVoIq/fSCF7JjeOD9++j8Q2u9QoIBBsrOaMtB5dAMNpdapRsdqsRRXmD1PR+LrG3Rfk0qGAJ/MAdNxIZn01UIFjj2An7OfbiMDf0vJ0iSjou8f/ZWByHvpu18MiLu4nJwkQHPN/9NdlRF+fbBesrwAruRaEv9V5ZkPL+4M3aSjBjRo8JHYlomKgkz9yj7Nltwl7J9DILyT0bkCt6R6ZXSgSiySvFVs70pjdQZDi1csd0fk7Yq6YWTZFJRu9KGHNNv62SW29Y+wfouGVtMZQ0T0uPX8FAckCr9GVsgl+KXtx/ragODvkSd2gkF2WVC5CsiK4UZY3kU8WNE8VG1P+oqLpUh0Ty7zAI0xmAfxYcQMd31n6QFGgeR4/aQp4GWI8gvmvvpImx/2xI7lqmO/sI4od5mdCRDvMG+7OzIHJd1K8d5kemN32Y06CBwFnSx5XTItlshoWCFZhI+piuZnYoezbYcagXGGIxYyHJk36Hz1uqNWxRDuYAxxuomiJoXLhW9O5gCfCtfz6QUR6OgLf3IZYgutgo9ufhKrYsRAOOOO9yoIrGmwnOvWYpYJzmAlro0+Rvaofc76DP/aHquYHzOiCUd8Wq1ywRWYeXXVjl8FIgsqGKt1z9hUPdlu4ErHKJSqQDCR7WFvqL1OcJ6SfeK/4B1Ly/Z4XLkCAAAAAASUVORK5CYII=";
const footerIcon2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAoCAYAAABjPNNTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJpSURBVHgB5VjrcdswDIZ7/R9vUI2gDapM0IzgDeINqk4QdwJng7oTqBvYnYDqBHYmQMETdaEgggJp+aJcvjucLQqPjxQBPgA+GhBxTVLAEuHIfSc54yv2iyFsiZAYDMO8OVEiUEYIzkZ0pVV0gdZOLL6SbL3nHgeSB9Z2IflBcvLa2tVq1cIcIHKPbK5JsDqVs6mUNoZkA9cAu2TQwBIqma1mKvR4ghxglxAaNCjMOeejUfqpJC6fIzw37PkPyV/o5pdFS3KieXWSHLg5d+9G2Urhvf7m2no8uBh6kONfrKcFzAgcf6mDpPsp4meQtbNlouzvTtKNkVwMtCN5gdvgIsSbBnblw8cRroDzt0dWE61fbYZzh6G1eAuZcAT9wl5772oW5zyZoAJBg5mZHSBosfPer5PjBQyme5ZGcORP0Gskp5uAwxIyECFYJuhXIcUdUxLnIXZr+lNolFMJenZ8kPb9O78E8RJwlpzRTw3dNu3oB3f/GxiXr/vY8unAi/kLBIJXmt5T23NIL3cE+84FbDeScjMVJEIml2ARsDVTBoYbkKwVRHMJmkC8QmPICdQBPYmouiqQ3jaZoGfM5+dR0ONEk8oWjpfFtJKHw89wjuiVLliTGoR1MH1/gCyJ4AZgo9hIeu9+PznYQ1JPv8CMCCTIi6QbO4j9Y88Hcvzbe25h4iDmEeIHsTsYHsJ6f2kIZLiEBuc50haQAxxvOiQY1K1MEnZwDbAruEYRKOeaxepM7vpTL6wKr6kieQT9hdVPGB7+27mPyUGg/uova/M8J9ECl3yJ2sMRfWZzrUa2e1oMHOFlkrsl/gObQuY+DdJ4vQAAAABJRU5ErkJggg==";
const footerIcon3 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAoCAMAAABU4iNhAAAANlBMVEUAAAD////////////////////////////////////////////////////////////////////xY8b8AAAAEXRSTlMA32AfEEDvnzC/kFCAr3DPoANIFPgAAAD2SURBVDjL7VNRFoMgDKNQUEE3uf9lV5x9rRa2C5gPgRKSvILugQLO3peI/2gxQ/0CpviLt1SNbcQLJ08Q+sQ5tc2US2iLskN994n+COdRHW0fxK5iNuW4moxARFPFDCbq1CNGqN54E3EygmftEon6A8EIHrUA2iyQpL8LnrVCo6i+pMsiyN40eWnzzQiSN28ujpH4mAge3myY2sgGUYiNxd63oIFjnm7sLR0MXaZ48+6ImcXbaDqaF/UE2FtyakN9D3laUZZrVQ91l5ZZLByFDWZD6d00pvHvtVFod8lSE/SQuA8iOsL9Pc4wJKZ4e+HR91HQPfgANh4T99fFmZMAAAAASUVORK5CYII=";
const Shape1 = "/assets/footer2-shape-DJHLVI5d.png";
const Shape2 = "/assets/footer2-shape2-BL1XYCXF.png";
const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
const footerData = [
  {
    title: "Product",
    links: [{ label: "Pricing" }, { label: "Integration" }, { label: "Features" }, { label: "Templates" }, { label: "Changelog" }]
  },
  {
    title: "Support",
    links: [{ label: "On-boarding" }, { label: "Help center" }, { label: "Contact us" }, { label: "Experts" }, { label: "Status" }]
  },
  {
    title: "Resources",
    links: [{ label: "Community" }, { label: "Affiliates" }, { label: "Partnerships" }, { label: "Perks & Benefits" }, { label: "Api docs" }]
  },
  {
    title: "Company",
    links: [{ label: "About" }, { label: "Our blog" }, { label: "In the press" }, { label: "Brand assets" }, { label: "Work with us" }]
  },
  {
    title: "Download",
    links: [{ label: "iPhone & iPad" }, { label: "Android" }, { label: "MacOS" }, { label: "Window" }]
  }
];
const Footer$1 = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "footer2 _relative", children: [
    /* @__PURE__ */ jsxs(Container, { children: [
      /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsxs("div", { className: "footer-icon-box-all", children: [
        /* @__PURE__ */ jsxs("div", { className: "footer-icon-box", children: [
          /* @__PURE__ */ jsx("div", { className: "icon", children: /* @__PURE__ */ jsx("img", { src: footerIcon1, alt: "" }) }),
          /* @__PURE__ */ jsx("div", { className: "headding", children: /* @__PURE__ */ jsx("p", { children: "Free training & 24-hours" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "footer-icon-box", children: [
          /* @__PURE__ */ jsx("div", { className: "icon", children: /* @__PURE__ */ jsx("img", { src: footerIcon2, alt: "" }) }),
          /* @__PURE__ */ jsx("div", { className: "headding", children: /* @__PURE__ */ jsx("p", { children: "Serious about security & privacy" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "footer-icon-box", children: [
          /* @__PURE__ */ jsx("div", { className: "icon", children: /* @__PURE__ */ jsx("img", { src: footerIcon3, alt: "" }) }),
          /* @__PURE__ */ jsx("div", { className: "headding", children: /* @__PURE__ */ jsx("p", { children: "Highest levels of uptime the last 12 months" }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "space50" }),
      /* @__PURE__ */ jsxs(Row, { children: [
        footerData.map((section, idx) => /* @__PURE__ */ jsx(Col, { lg: true, md: 6, xs: 12, children: /* @__PURE__ */ jsxs("div", { className: "single-footer-items", children: [
          /* @__PURE__ */ jsx("h3", { children: section.title }),
          /* @__PURE__ */ jsx("ul", { className: "menu-list", children: section.links.map((link, linkIdx) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "", children: link.label }) }, linkIdx)) })
        ] }) }, idx)),
        /* @__PURE__ */ jsx(Col, { lg: 3, md: 6, xs: 12, children: /* @__PURE__ */ jsxs("div", { className: "single-footer-items", children: [
          /* @__PURE__ */ jsx("h3", { children: "Product" }),
          /* @__PURE__ */ jsxs("ul", { className: "social-icons", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "", children: /* @__PURE__ */ jsx(FaLinkedinIn, {}) }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "", children: /* @__PURE__ */ jsx(FaXTwitter, {}) }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "", children: /* @__PURE__ */ jsx(FaYoutube, {}) }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "", children: /* @__PURE__ */ jsx(FaInstagram, {}) }) })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space40" }),
      /* @__PURE__ */ jsx("div", { className: "copyright-area", children: /* @__PURE__ */ jsxs(Row, { className: "align-items-center", children: [
        /* @__PURE__ */ jsx(Col, { md: 5, children: /* @__PURE__ */ jsx("div", { className: "logo", children: /* @__PURE__ */ jsx(Link, { to: "/home-1", children: /* @__PURE__ */ jsx("img", { src: Webdock, alt: "" }) }) }) }),
        /* @__PURE__ */ jsx(Col, { md: 7, children: /* @__PURE__ */ jsxs("div", { className: "coppyright text-right", children: [
          /* @__PURE__ */ jsxs(Link, { to: "", children: [
            "@ ",
            currentYear,
            " eSoft"
          ] }),
          /* @__PURE__ */ jsx(Link, { to: "", children: "Security" }),
          /* @__PURE__ */ jsx(Link, { to: "", children: "Your Privacy" }),
          /* @__PURE__ */ jsx(Link, { to: "", children: "Terms" })
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("img", { className: "footer-shape", src: Shape1, alt: "" }),
    /* @__PURE__ */ jsx("img", { className: "footer-shape2", src: Shape2, alt: "" })
  ] }) });
};
const Logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAAsCAMAAABorteMAAAAaVBMVEUAAABoWP9qXP9qXP9qXP9oXP9wV/9qXP9pW/9pW/9qW/9qXP9pW/9pXP9pW/9qW/9mWv9qXP9qXP/////t6/+1rv+imf/Hwv99cP98cf9zZv/29f+Mgv+so//19f/j4f+Zj//a1v++uP8yFyzTAAAAEnRSTlMAH9+/70AQgGBQn89wr6CQMG8zLjhPAAAC/ElEQVRYw9WY6XKbMBSFtSMhCI4MiWPHadL3f8haV1hXC7bbmcA054/FYPShuxwEpJAyQ8+Ec8LywSiykSQXLlVvyAYyzFVimqwsyt2iLCVr6lm4GxIdWU+Nu6OGoLbDIngd7PbgZ/dQa+SYisdcsUJV2xJynD4mV4h/O1aXiJeP/X4/vrhc5kHQ5O6Oraqm57ywoMKl3r/2Qb/ecue6B20FxETfOg+MNnfHPMSvHjmeR//zmpHlHc95UPfM1dw+T+wFd5qOzk2B/zcZlnXd138QQ+MzFedRaYhhlXNqD684Bgl1py6tlh3zf7plD5AC5GZh9tgTphZuY3xYWdQnX/kl+BvYkVpPzjlacIece3bTCVP7MqbcIa9fqTCKIXWmNao+v8zlOfeQBtiPE26fVJKFjMNku9pWVCPiecqYP2CMdQNjDoYXtC3WC7QRyLDk40InKZ6VETD6xlBsm6S+KZr8UzKTKPI7vocA132ENdPCteLaXB1uThA7q7vFdaiUdpxisFGJwVkaeDx/nDE635ZopGHQBEpK36paSip1B6WvTeCiJiBPSR991lwOZTIPFNwJT5pcufR8l9UVjXWVxLns2k+Iex1nWJiXwL5RsusZBB7rO46WuCy1q9C12MHnjGtnhCvdk5owqYVm0z6VSKm5lU2O01ue5kPG5bhe0V5FSSuuVqZhfSZbb19za9/ILfLspow7lPk1Gg7jqRbyqWI/Qz1VXFv7JHQtdvB+2Sf1XLiSOdGEVTmmpWnnguJwvDMcjiu/EppeDpSo+yiOoZ2jou/BhAIu1IXlDcW+qSHIRXtkxVXBnE8TPhHdkk1Sm02rbFECu8SvCq6MXLnUR6GPfx9vbXQ0A0qMPJBxv0Gfgj9Lgtz0Slt0Upbar/d7+5ydlJSglITnD0re3G8pSvPKwjSXRhUy+d3iJfgwwVYnk41///H7dtL963vKD38vA/B/+AIM2JXUbf6dAc1vUZySlaVZTWXbfMHq8whzSTaSMgO34oJk/arfCf8Af/CTdrAgR3sAAAAASUVORK5CYII=";
const useScrollEvent = () => {
  const [scrollPassed, setScrollPassed] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const handleScroll = () => {
    setScrollY(window.scrollY);
    setScrollPassed((window.scrollY + window.innerHeight) * 100 / document.body.offsetHeight);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    setScrollY(window.scrollY);
    setScrollHeight(document.body.offsetHeight);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return {
    scrollPassed,
    scrollY,
    scrollHeight
  };
};
const menu = [
  {
    title: "Home",
    icon: "FaAngleDown",
    demos: [
      {
        image: "abc",
        //demo1,
        multiPage: "1",
        //'/home-1',
        onePage: "2",
        //'/single/home-1',
        title: "3"
        //'01. Time Tracker',
      },
      {
        image: "Abc",
        //demo2,
        multiPage: "1",
        // '/home-2',
        onePage: "2",
        //'/single/home-2',
        title: "3"
        //'02. Web Page Builder',
      },
      {
        image: "abc",
        //demo3,
        multiPage: "1",
        //'/home-3',
        onePage: "2",
        //'/single/home-3',
        title: "3"
        //'03. POS Software',
      },
      {
        image: "abc",
        //demo4,
        multiPage: "1",
        //'/home-4',
        onePage: "2",
        //'/single/home-4',
        title: "3"
        //'04. Password Manager',
      },
      {
        image: "abc",
        //demo5,
        multiPage: "1",
        //'/home-5',
        onePage: "2",
        //'/single/home-5',
        title: "3"
        //'05. HR Software',
      },
      {
        image: "abc",
        //demo6,
        multiPage: "1",
        //'/home-6',
        onePage: "2",
        //'/single/home-6',
        title: "3"
        //'06. Email Marketing',
      },
      {
        image: "abc",
        //demo7,
        multiPage: "1",
        //'/home-7',
        onePage: "2",
        //'/single/home-7',
        title: "3"
        //'07. Project Management',
      },
      {
        image: "abc",
        //demo8,
        multiPage: "1",
        //'/home-8',
        onePage: "2",
        //'/single/home-8',
        title: "3"
        //'08. SEO Software',
      },
      {
        image: "abc",
        //demo9,
        multiPage: "1",
        //'/home-9',
        onePage: "2",
        //'/single/home-9',
        title: "3"
        //'09. Social Media',
      }
      /*{ image: rtl, multiPage: '/rtl', onePage: '/single/rtl', title: '10. RTL Version' },*/
    ]
  },
  {
    title: "About Us",
    link: "/"
  },
  {
    title: "Pages",
    subMenu: [
      { title: "Contact Us", link: "/contact" },
      { title: "Features", link: "/features" },
      { title: "Testimonial", link: "/testimonial" },
      { title: "Pricing", link: "/pricing" },
      { title: "Download", link: "/download" },
      { title: "404", link: "/error" }
    ]
  },
  {
    title: "Blog",
    subMenu: [
      { title: "Blog", link: "/blog" },
      { title: "Details Left", link: "/blog-details-sidebar-left" },
      { title: "Details Right", link: "/blog-details-sidebar-right" },
      { title: "Blog Details", link: "/blog-details" }
    ]
  },
  {
    title: "Account",
    subMenu: [
      { title: "Create Account", link: "/account" },
      { title: "Login", link: "/login" },
      { title: "Forgot", link: "/forgot" },
      { title: "Reset", link: "/reset" },
      { title: "Verify Email", link: "/verify" },
      { title: "Success", link: "/form-success" }
    ]
  }
];
const Menu = () => {
  return /* @__PURE__ */ jsx("ul", { children: menu.map((item, idx) => /* @__PURE__ */ jsx("li", { className: item.subMenu || item.demos ? "dropdown-menu-parrent" : "", children: item.demos ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Link, { to: "", children: [
      item.title,
      " ",
      /* @__PURE__ */ jsx(FaAngleDown, {})
    ] }),
    /* @__PURE__ */ jsx("div", { className: "tp-submenu", children: /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsxs(Col, { lg: 12, children: [
      /* @__PURE__ */ jsx("div", { className: "all-images-menu", children: item.demos.slice(0, 5).map((demo, i) => /* @__PURE__ */ jsxs("div", { className: "homemenu-thumb", style: i === 4 ? { margin: "0 0 20px 0" } : {}, children: [
        /* @__PURE__ */ jsx("div", { className: "img1", children: /* @__PURE__ */ jsx("img", { src: demo.image, alt: "" }) }),
        /* @__PURE__ */ jsxs("div", { className: "homemenu-btn", children: [
          /* @__PURE__ */ jsxs(Link, { className: "header-btn1", to: demo.multiPage, children: [
            "Multi Page ",
            /* @__PURE__ */ jsx(FaArrowRight, {})
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space16" }),
          /* @__PURE__ */ jsxs(Link, { className: "header-btn1", to: demo.onePage, target: "_blank", children: [
            "One page ",
            /* @__PURE__ */ jsx(FaArrowRight, {})
          ] })
        ] }),
        /* @__PURE__ */ jsx(Link, { to: demo.multiPage, className: "bottom-heading", children: demo.title })
      ] }, i)) }),
      /* @__PURE__ */ jsx("div", { className: "all-images-menu", children: item.demos.slice(5).map((demo, i) => /* @__PURE__ */ jsxs("div", { className: "homemenu-thumb", style: i === item.demos.slice(5).length - 1 ? { margin: "0 0 20px 0" } : {}, children: [
        /* @__PURE__ */ jsx("div", { className: "img1", children: /* @__PURE__ */ jsx("img", { src: demo.image, alt: "" }) }),
        demo.title === "10. RTL Version" && /* @__PURE__ */ jsx("div", { className: "text", children: /* @__PURE__ */ jsx("h2", { children: "RTL" }) }),
        /* @__PURE__ */ jsxs("div", { className: "homemenu-btn", children: [
          /* @__PURE__ */ jsxs(Link, { className: "header-btn1", to: demo.multiPage, children: [
            "Multi Page ",
            /* @__PURE__ */ jsx(FaArrowRight, {})
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space16" }),
          /* @__PURE__ */ jsxs(Link, { className: "header-btn1", to: demo.onePage, target: "_blank", children: [
            "One page ",
            /* @__PURE__ */ jsx(FaArrowRight, {})
          ] })
        ] }),
        /* @__PURE__ */ jsx(Link, { to: demo.multiPage, className: "bottom-heading", children: demo.title })
      ] }, i)) })
    ] }) }) })
  ] }) : item.subMenu ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Link, { to: "", children: [
      item.title,
      " ",
      /* @__PURE__ */ jsx(FaAngleDown, {})
    ] }),
    /* @__PURE__ */ jsx("ul", { children: item.subMenu.map((sub, subIdx) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: sub.link, children: sub.title }) }, subIdx)) })
  ] }) : /* @__PURE__ */ jsx(Link, { to: item.link, children: item.title }) }, idx)) });
};
const HeaderLogo1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHoAAAAsCAMAAACdUFw8AAAAxlBMVEUAAAD///////////////////////////////////////////////////////////////////////////9gO/N0U/Xs5/7EtftgOvSHCv56GvpvKPhoMfZqR/X18/6wnfmchPhjN/Xw4v+cIf+VKv2OMvyvnfl2H/lsLPdhPPTXzvychfh7Svf48P/Il/69pPu4kvt+Fft+YPbUuv7Chv61Zf7h2v3KrvyndvuJOfqIbPZuQvXiwf/VoP/Xtf63k/uDJ/qlkfh/fr6BAAAAE3RSTlMAIN+/70CgEGBQz4Bwr5AffzBvdxjvowAAA3JJREFUWMPdmFlD4jAUhbM2TbeBSYuARRRFwd1xGXX2//+nprkVkjQs89I+zHnQlkC/Jvfc0wBqSMgsJUwpFtFMCtSdOGXKVipRN5JEeSIhal+Yqo2KMGpZn5naIpagVtVTO9RDrQnInbJ9cvfsz2qvWqo3ZvvRrB2fR03O0XRyrhqiqAWFTcrBJM+XxYFyJfcsHe/vyF3RSyn106mRYZfveXmSV/oycHNtFzeAmtFw2zgwAi8+3bU+zvOTw7e7QsOPHTjfEUd7OgHIPjq1weeTivjt/kap8+pgeH37L9Xmfif4b2BZrEtmX0fYa13kWnWZB8fV9MdnP4zJxQ6bRiFPiH4T2qC4GoBaGHRzvTVZW+yjzJfXhw+j071Gw9oIQs9C30Mf+Qqq1z/56MxBD+/UdLKs7uAK4F/nNjpzHc2FWc66jDKQwh7fg6YO+nCmV9qs+uzZQqeWsSKoPuRM308c0WPrcUyIPiGEJBkhCg5reuSgL+6gzAV4bKaPbza0l6COqwCTxhKbXrIcj9VKceBeibnosniBVCm0x55nbpjaC6gIW3VcYrY0NhmU7EA7MVaMS93N0GYVenTmRpoVfxGukRQcbBYGf9wZi7kExwvBeaodzjnmYQLNEEoXDXqC9prCqr8+jEZ58eihwR54dSDgZqjV/ELZ44ljM2zbjLnswZXx2M/TUZ7P/QWH6Wkx00yCJymBCliOh6PtaGKHmf7zUpgAv10OLXRkQsiNVyzr62rLZlCP2Ab5aD9HiykADzS8fNV9Nlyc+UmqFyBYCaOArYIuhFlKZ9api94aKSZDh4uL+a2almMLnTVrLUM4XQ8FUFux7nOwl4eOtgVpMQB4sRiPHsrhwkZL43CwMieKxdW/uq+4DD78ReG8Lymce2nGQozryjG7uXKToW+lfnzOv5th4SQggw+GjUDMGhuuuBGk1A4nqizBQ3MyhT0SPD7VphzFkXNlETXs0CdmvIHmNpp7zTXMr3/B/P8cbdshhQRA6xLUcBo2di0cGbT9ychvr7rMy8pjF2X+frlrg9TnHFungsOTyohv3asJjD2jmZJXGXr6qFyFqAXRJntw//vpRrmKkKX/4SsASjr/4mMU7yPHqDXF3ZMNu3OyUdL9DxqNdPRFMWpfIfHBpLNfzlJ3qSlH3UnIjEasopK07R8q/wIxsKRmaCO8owAAAABJRU5ErkJggg==";
const useToggle = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const show = useCallback(() => setIsOpen(true), []);
  const hide = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);
  return { isOpen, toggle, show, hide };
};
const MobileMenu = () => {
  const [openSubMenus, setOpenSubMenus] = useState({});
  const handleSubMenuToggle = (index2) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [index2]: !prev[index2]
    }));
  };
  const getSubmenuStyle = (index2) => ({
    transform: openSubMenus[index2] ? "scaleY(1)" : "scaleY(0)",
    opacity: openSubMenus[index2] ? 1 : 0,
    transformOrigin: "top",
    transition: "transform 0.3s ease, opacity 0.3s ease",
    display: openSubMenus[index2] ? "block" : "none"
  });
  const displayNames = {
    account: "Create Account",
    login: "Login",
    forgot: "Forgot",
    reset: "Reset",
    verify: "Verify Email",
    "form-success": "Success"
  };
  return /* @__PURE__ */ jsx("div", { className: "mobile-nav hash-has-sub", children: /* @__PURE__ */ jsxs("ul", { children: [
    /* @__PURE__ */ jsxs("li", { className: "has-dropdown hash-has-sub", children: [
      /* @__PURE__ */ jsx("span", { className: `submenu-button ${openSubMenus[1] ? "submenu-opened" : ""}`, onClick: () => handleSubMenuToggle(1), children: /* @__PURE__ */ jsx("em", {}) }),
      /* @__PURE__ */ jsx(Link, { to: "", children: "Home" }),
      /* @__PURE__ */ jsxs("ul", { style: getSubmenuStyle(1), className: "ms-3", children: [
        /* @__PURE__ */ jsxs("li", { className: "has-dropdown hash-has-sub", children: [
          /* @__PURE__ */ jsx("span", { className: `submenu-button ${openSubMenus[2] ? "submenu-opened" : ""}`, onClick: () => handleSubMenuToggle(2), children: /* @__PURE__ */ jsx("em", {}) }),
          /* @__PURE__ */ jsx(Link, { to: "", children: "Multipage" }),
          /* @__PURE__ */ jsx("ul", { style: getSubmenuStyle(2), className: "ms-3", children: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "rtl"].map((v) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: `/${v === "rtl" ? "rtl" : `home-${v}`}`, children: v === "rtl" ? "RTL" : `Home ${v}` }) }, v)) })
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "has-dropdown hash-has-sub", children: [
          /* @__PURE__ */ jsx("span", { className: `submenu-button ${openSubMenus[3] ? "submenu-opened" : ""}`, onClick: () => handleSubMenuToggle(3), children: /* @__PURE__ */ jsx("em", {}) }),
          /* @__PURE__ */ jsx(Link, { to: "", children: "Landing Page" }),
          /* @__PURE__ */ jsx("ul", { style: getSubmenuStyle(3), className: "ms-3", children: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "rtl"].map((v) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: `/single/${v === "rtl" ? "rtl" : `home-${v}`}`, children: v === "rtl" ? "RTL" : `Home ${v}` }) }, v)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/about", children: "About Us" }) }),
    /* @__PURE__ */ jsxs("li", { className: "has-dropdown hash-has-sub", children: [
      /* @__PURE__ */ jsx("span", { className: `submenu-button ${openSubMenus[4] ? "submenu-opened" : ""}`, onClick: () => handleSubMenuToggle(4), children: /* @__PURE__ */ jsx("em", {}) }),
      /* @__PURE__ */ jsx(Link, { to: "", children: "Pages" }),
      /* @__PURE__ */ jsx("ul", { style: getSubmenuStyle(4), className: "ms-3", children: ["contact", "features", "testimonial", "pricing", "download", "error"].map((page2) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: `/${page2}`, children: page2.charAt(0).toUpperCase() + page2.slice(1) }) }, page2)) })
    ] }),
    /* @__PURE__ */ jsxs("li", { className: "has-dropdown hash-has-sub", children: [
      /* @__PURE__ */ jsx("span", { className: `submenu-button ${openSubMenus[5] ? "submenu-opened" : ""}`, onClick: () => handleSubMenuToggle(5), children: /* @__PURE__ */ jsx("em", {}) }),
      /* @__PURE__ */ jsx(Link, { to: "", children: "Blog" }),
      /* @__PURE__ */ jsxs("ul", { style: getSubmenuStyle(5), className: "ms-3", children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/blog", children: "Blog" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/blog-details-sidebar-left", children: "Details Left" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/blog-details-sidebar-right", children: "Details Right" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/blog-details", children: "Blog Details" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("li", { className: "has-dropdown hash-has-sub", children: [
      /* @__PURE__ */ jsx("span", { className: `submenu-button ${openSubMenus[6] ? "submenu-opened" : ""}`, onClick: () => handleSubMenuToggle(6), children: /* @__PURE__ */ jsx("em", {}) }),
      /* @__PURE__ */ jsx(Link, { to: "", children: "Account" }),
      /* @__PURE__ */ jsx("ul", { style: getSubmenuStyle(6), className: "ms-3", children: ["account", "login", "forgot", "reset", "verify", "form-success"].map((page2) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: `/${page2}`, children: displayNames[page2] || page2.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase()) }) }, page2)) })
    ] })
  ] }) });
};
const MobileTop$2 = () => {
  const { isOpen, toggle } = useToggle();
  const sidebarRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggle();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, toggle]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "mobile-header d-block d-lg-none ", children: /* @__PURE__ */ jsx(Container, { fluid: true, children: /* @__PURE__ */ jsx(Col, { xs: 12, children: /* @__PURE__ */ jsxs("div", { className: "mobile-header-elements", children: [
      /* @__PURE__ */ jsx("div", { className: "mobile-logo", children: /* @__PURE__ */ jsx(Link, { to: "/home-1", children: /* @__PURE__ */ jsx("img", { src: Logo, alt: "" }) }) }),
      /* @__PURE__ */ jsx("div", { onClick: toggle, className: "mobile-nav-icon", children: /* @__PURE__ */ jsx(FaBarsStaggered, {}) })
    ] }) }) }) }),
    /* @__PURE__ */ jsxs("div", { ref: sidebarRef, className: `mobile-sidebar d-block d-lg-none ${isOpen ? "mobile-menu-active" : ""}`, children: [
      /* @__PURE__ */ jsx("div", { className: "logo-m", children: /* @__PURE__ */ jsx(Link, { to: "/home-1", children: /* @__PURE__ */ jsx("img", { src: HeaderLogo1, alt: "" }) }) }),
      /* @__PURE__ */ jsx("div", { onClick: toggle, className: "menu-close", children: /* @__PURE__ */ jsx(FaXmark, {}) }),
      /* @__PURE__ */ jsxs("div", { className: "mobile-nav", children: [
        /* @__PURE__ */ jsx(MobileMenu, {}),
        /* @__PURE__ */ jsx(Link, { to: "/account", className: "theme-btn3", children: "Sign Up For Free" }),
        /* @__PURE__ */ jsxs("div", { className: "contact-infos", children: [
          /* @__PURE__ */ jsx("h3", { children: "Contact Info" }),
          /* @__PURE__ */ jsxs("div", { className: "box", children: [
            /* @__PURE__ */ jsx("div", { className: "icon", children: /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FiPhone, {}) }) }),
            /* @__PURE__ */ jsx("div", { className: "pera", children: /* @__PURE__ */ jsx(Link, { to: "tel:921-888-0022", children: "921-888-0022" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "box", children: [
            /* @__PURE__ */ jsx("div", { className: "icon", children: /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaRegEnvelope, {}) }) }),
            /* @__PURE__ */ jsx("div", { className: "pera", children: /* @__PURE__ */ jsx(Link, { to: "mailto:example@visafast.com", children: "example@visafast.com" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "contact-infos", children: [
          /* @__PURE__ */ jsx("h3", { children: "Our Location" }),
          /* @__PURE__ */ jsxs("div", { className: "box", children: [
            /* @__PURE__ */ jsx("div", { className: "icon", children: /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(SlLocationPin, {}) }) }),
            /* @__PURE__ */ jsx("div", { className: "pera", children: /* @__PURE__ */ jsxs(Link, { to: "", children: [
              "55 East Birchwood Ave.Brooklyn, ",
              /* @__PURE__ */ jsx("br", {}),
              "New York 11201,United States"
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "contact-infos", children: [
          /* @__PURE__ */ jsx("h3", { children: "Our Location" }),
          /* @__PURE__ */ jsxs("ul", { className: "icon-list", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "", children: /* @__PURE__ */ jsx(FaLinkedinIn, {}) }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "", children: /* @__PURE__ */ jsx(FaXTwitter, {}) }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "", children: /* @__PURE__ */ jsx(FaYoutube, {}) }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "", children: /* @__PURE__ */ jsx(FaInstagram, {}) }) })
          ] })
        ] })
      ] })
    ] })
  ] });
};
const Navbar = () => {
  const { scrollY } = useScrollEvent();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("header", { children: /* @__PURE__ */ jsx("div", { className: `header-area header-area2 header-area-all d-none d-lg-block ${scrollY > 100 && "sticky"}`, id: "header", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { xs: 12, children: /* @__PURE__ */ jsxs("div", { className: "header-elements", children: [
      /* @__PURE__ */ jsx("div", { className: "site-logo home1-site-logo", children: /* @__PURE__ */ jsx(Link, { to: "/home-1", children: /* @__PURE__ */ jsx("img", { src: Logo, alt: "" }) }) }),
      /* @__PURE__ */ jsx("div", { className: "main-menu-ex main-menu-ex1", children: /* @__PURE__ */ jsx(Menu, {}) }),
      /* @__PURE__ */ jsxs("div", { className: "header2-buttons", children: [
        /* @__PURE__ */ jsx(Link, { to: "/login", className: "login-btn", children: "Log In" }),
        /* @__PURE__ */ jsx(Link, { to: "/account", className: "theme-btn2", children: "Sign Up For Free" })
      ] })
    ] }) }) }) }) }) }),
    /* @__PURE__ */ jsx(MobileTop$2, {})
  ] });
};
const MainLayout = ({ children }) => {
  useEffect(() => {
    document.body.classList.add("body2", "body");
    return () => {
      document.body.classList.remove("body2", "body");
    };
  }, []);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Suspense, { fallback: /* @__PURE__ */ jsx(Loader, {}), children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    children,
    /* @__PURE__ */ jsx(CTA$3, {}),
    /* @__PURE__ */ jsx(Footer$1, {})
  ] }) });
};
const LeftSide$1 = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Col, { lg: 4, children: /* @__PURE__ */ jsxs("div", { className: "sidebar-single-box", children: [
    /* @__PURE__ */ jsx("h3", { children: "Email Campaign Playbook" }),
    /* @__PURE__ */ jsx("div", { className: "sidebar-list", children: /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/blog-details", className: "active", children: "Best Masterful Email Marketing Starts Here: Introducing eSoft ...." }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/blog-details", children: "Crafting Success: Your Email Marketing Solution -eSoft ...." }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/blog-details", children: "Beyond the Inbox: Marketing Redefines Email Strategies ...." }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/blog-details", children: "Effortless Excellence: Your Email Marketing Revolution – eSoft ...." }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/blog-details", children: "Best Experience Excellence: eSoft Revolutionises Email Outreach ...." }) })
    ] }) })
  ] }) }) });
};
const RightSide$1 = () => {
  return /* @__PURE__ */ jsx(Col, { lg: 8, children: /* @__PURE__ */ jsxs("div", { className: "blog-details-all pr60", children: [
    /* @__PURE__ */ jsx("article", { children: /* @__PURE__ */ jsxs("div", { className: "details-box", children: [
      /* @__PURE__ */ jsx("div", { className: "image" }),
      /* @__PURE__ */ jsx("div", { className: "space20" }),
      /* @__PURE__ */ jsxs("div", { className: "all-tags", children: [
        /* @__PURE__ */ jsx(Link, { to: "#", className: "tag", children: "#Email Marketing" }),
        /* @__PURE__ */ jsx(Link, { to: "#", children: " 10 October 2023" }),
        /* @__PURE__ */ jsx(Link, { to: "#", children: " 10 October 2023" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space10" }),
      /* @__PURE__ */ jsxs("div", { className: "headding2", children: [
        /* @__PURE__ */ jsx("h2", { children: "Best Masterful Email Marketing Starts Here: Introducing eSoft" }),
        /* @__PURE__ */ jsx("div", { className: "space16" }),
        /* @__PURE__ */ jsx("p", { children: "Email marketing, where brilliance meets innovation. At Your SaaS Name, we're on an mission to transform the way you connect with your audience. Unleash the power of personalised, high-converting campaigns with our intuitive drag-and-drop editor." }),
        /* @__PURE__ */ jsx("div", { className: "space16" }),
        /* @__PURE__ */ jsx("p", { children: "Unleash the power of personalised, high-converting campaigns with our intuitive an drag-and-drop editor, smart segmentation, and powerful automation tools. Crafting emails that resonate has never been easier. Join a best community of marketers." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space40" }),
      /* @__PURE__ */ jsx("div", { className: "blog-border" }),
      /* @__PURE__ */ jsx("div", { className: "space40" })
    ] }) }),
    /* @__PURE__ */ jsx("article", { children: /* @__PURE__ */ jsxs("div", { className: "details-box", children: [
      /* @__PURE__ */ jsxs(Row, { children: [
        /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsx("div", { className: "image" }) }),
        /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsx("div", { className: "image" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space30" }),
      /* @__PURE__ */ jsxs("div", { className: "headding2", children: [
        /* @__PURE__ */ jsx("h5", { children: "Crafting Success: Your Email Marketing Email Brilliance Unleashed: Elevate Solution -eSoft" }),
        /* @__PURE__ */ jsx("div", { className: "space16" }),
        /* @__PURE__ */ jsx("p", { children: "Small business, or enterprise, WebDock Studio has a plan tailored to your needs. Don't miss out on the email marketing revolution – sign up for a free trial today and experience the magic of Your SaaS Name. Engage, convert, succeed – your journey starts here." }),
        /* @__PURE__ */ jsx("div", { className: "space10" }),
        /* @__PURE__ */ jsxs(Row, { children: [
          /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsxs("ul", { className: "text-list", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaCheck, {}) }),
              "Increased Organic Traffic"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaCheck, {}) }),
              "In-Depth Analytics Dashboard"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaCheck, {}) }),
              "Content Optimization Tools"
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsxs("ul", { className: "text-list", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaCheck, {}) }),
              "Regular Performance Monitoring"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaCheck, {}) }),
              "Responsive Design for Any Device"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaCheck, {}) }),
              "Improved Search Engine Rankings"
            ] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space40" }),
      /* @__PURE__ */ jsx("div", { className: "blog-border" }),
      /* @__PURE__ */ jsx("div", { className: "space40" })
    ] }) }),
    /* @__PURE__ */ jsx("article", { children: /* @__PURE__ */ jsxs("div", { className: "details-box", children: [
      /* @__PURE__ */ jsxs("div", { className: "headding2", children: [
        /* @__PURE__ */ jsx("h5", { children: "Beyond the Inbox: Marketing Redefines Email Efficiency & Meets Innovation Strategies" }),
        /* @__PURE__ */ jsx("div", { className: "space16" }),
        /* @__PURE__ */ jsx("p", { children: "Our platform goes beyond the inbox, offering a seamless and efficient experience. See your campaigns come to life with our analytics dashboard, providing data-driven insights for informed decisions. Whether you're a startup, small business." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "comment-area", children: /* @__PURE__ */ jsx("p", { children: "“Transforming the ordinary into the extraordinary, eSoft is more than just an email marketing platform; it's your gateway to and impactful communication. Craft, target, automate, and analyse with ease, ensuring every email resonates.”" }) }),
      /* @__PURE__ */ jsxs("div", { className: "headding2", children: [
        /* @__PURE__ */ jsx("h5", { children: "Crafting Success: Your Email Marketing Email Brilliance Unleashed Elevate Solution -eSoft" }),
        /* @__PURE__ */ jsx("div", { className: "space16" }),
        /* @__PURE__ */ jsx("p", { children: "Small business, or enterprise, eSoft has a plan tailored to your needs. Don't miss out on the email marketing revolution – sign up for a free trial today and experience the magic of Your SaaS Name. Engage, convert, succeed – your journey starts here." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space40" }),
      /* @__PURE__ */ jsx("div", { className: "blog-border" }),
      /* @__PURE__ */ jsx("div", { className: "space20" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "social-area-all", children: [
      /* @__PURE__ */ jsxs("div", { className: "tags", children: [
        /* @__PURE__ */ jsx(Link, { to: "#", className: "tag", children: "#Email Marketing" }),
        /* @__PURE__ */ jsx(Link, { to: "#", className: "date", children: " 10 October 2023" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "social-icons", children: /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { className: "text", children: "Share:" }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "#", children: /* @__PURE__ */ jsx(FaFacebookF, {}) }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "#", children: /* @__PURE__ */ jsx(FaGooglePlusG, {}) }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "#", children: /* @__PURE__ */ jsx(FaLinkedinIn, {}) }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "#", children: /* @__PURE__ */ jsx(FaYoutube, {}) }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space20" }),
    /* @__PURE__ */ jsxs("div", { className: "qustion-box", children: [
      /* @__PURE__ */ jsx("div", { className: "image" }),
      /* @__PURE__ */ jsx("div", { className: "pera", children: /* @__PURE__ */ jsxs("p", { children: [
        "Questions? Comments? Visit Our ",
        /* @__PURE__ */ jsx(Link, { to: "#", children: "Help Center" }),
        " For Support"
      ] }) })
    ] })
  ] }) });
};
const Details$2 = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "blog-details-sidebar", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Row, { children: [
    /* @__PURE__ */ jsx(RightSide$1, {}),
    /* @__PURE__ */ jsx(LeftSide$1, {})
  ] }) }) }) });
};
const Hero$a = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "pages-hero pages-hero-unic", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Row, { className: "align-items-center", children: [
      /* @__PURE__ */ jsx(Col, { lg: 7, children: /* @__PURE__ */ jsxs("div", { className: "main-headding", children: [
        /* @__PURE__ */ jsx("h1", { children: "The Ultimate Email Campaign Playbook" }),
        /* @__PURE__ */ jsx("p", { children: "Where email marketing meets innovation. Say goodbye to generic campaigns and hello to personalised, high-converting emails that resonate with your audience." }),
        /* @__PURE__ */ jsx("div", { className: "space30" }),
        /* @__PURE__ */ jsxs("div", { className: "all-text-hero", children: [
          /* @__PURE__ */ jsxs("div", { className: "autor-area", children: [
            /* @__PURE__ */ jsx("div", { className: "image" }),
            /* @__PURE__ */ jsxs("div", { className: "headding", children: [
              /* @__PURE__ */ jsx("h5", { children: /* @__PURE__ */ jsx(Link, { to: "", children: "Jonson Brans" }) }),
              /* @__PURE__ */ jsx("p", { children: "UI/UX Designer" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "tag", children: /* @__PURE__ */ jsx(Link, { to: "", children: "#Email Marketing" }) }),
          /* @__PURE__ */ jsx("div", { className: "date", children: /* @__PURE__ */ jsx(Link, { to: "", children: "10 October 2023" }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Col, { lg: 5, children: /* @__PURE__ */ jsx("div", { className: "hero-image shape-animaiton3" }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "space60" })
  ] });
};
const blogList$2 = [
  {
    image: "1",
    /*blogImg1,*/
    dateIcon: "1",
    /*iconDate,*/
    authorIcon: "1",
    /*iconAuthor,*/
    date: "10 October 2023",
    author: "Rabby Mahmud",
    title: "The Ultimate Email Campaign Playbook",
    description: "Effortlessly design stunning emails, automate your market workflow, & precisely target your audience for maximum.",
    link: "/blog-details"
  },
  {
    image: "2",
    /*blogImg2,*/
    dateIcon: "2",
    /*iconDate,*/
    authorIcon: "2",
    /*iconAuthor,*/
    date: "10 October 2023",
    author: "Rabby Mahmud",
    title: "Email Design: A Deep Dive in Visual Impact",
    description: "Effortlessly design stunning emails, automate your market workflow, & precisely target your audience for maximum.",
    link: "/blog-details"
  }
];
const More$2 = () => {
  return /* @__PURE__ */ jsx("div", { className: "blog2 sp", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 6, className: "m-auto text-center", children: /* @__PURE__ */ jsxs("div", { className: "headding2", children: [
      /* @__PURE__ */ jsx("h2", { children: "Our Latest Blog & News" }),
      /* @__PURE__ */ jsx("div", { className: "space16" }),
      /* @__PURE__ */ jsx("p", { children: "Our dynamic Landing Pages redefine user experiences, eSoft ensuring every click counts, dive into the world of insightful." })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "space30" }),
    /* @__PURE__ */ jsx(Row, { children: blogList$2.map((item, i) => /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsxs("div", { className: "blog-box", children: [
      /* @__PURE__ */ jsx("div", { className: "image" }),
      /* @__PURE__ */ jsxs("div", { className: "headding", children: [
        /* @__PURE__ */ jsxs("div", { className: "tags", children: [
          /* @__PURE__ */ jsxs(Link, { to: "#", children: [
            " ",
            item.date
          ] }),
          /* @__PURE__ */ jsx(Link, { to: "#", children: item.author })
        ] }),
        /* @__PURE__ */ jsx("h4", { children: /* @__PURE__ */ jsx(Link, { to: item.link, children: item.title }) }),
        /* @__PURE__ */ jsx("p", { children: item.description }),
        /* @__PURE__ */ jsxs(Link, { to: item.link, className: "learn", children: [
          "Read more",
          /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaArrowRight, {}) })
        ] })
      ] })
    ] }) }, i)) })
  ] }) });
};
const meta$j = () => {
  return [{ title: "Web Page Builder" }];
};
const index$c = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(MainLayout, { children: [
    /* @__PURE__ */ jsx(Hero$a, {}),
    /* @__PURE__ */ jsx(Details$2, {}),
    /* @__PURE__ */ jsx(More$2, {})
  ] }) });
};
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$c,
  meta: meta$j
}, Symbol.toStringTag, { value: "Module" }));
const LeftSide = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Col, { lg: 4, children: /* @__PURE__ */ jsxs("div", { className: "sidebar-single-box", children: [
    /* @__PURE__ */ jsx("h3", { children: "Email Campaign Playbook" }),
    /* @__PURE__ */ jsx("div", { className: "sidebar-list", children: /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/blog-details", className: "active", children: "Best Masterful Email Marketing Starts Here: Introducing eSoft ...." }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/blog-details", children: "Crafting Success: Your Email Marketing Solution -eSoft ...." }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/blog-details", children: "Beyond the Inbox: Marketing Redefines Email Strategies ...." }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/blog-details", children: "Effortless Excellence: Your Email Marketing Revolution – eSoft ...." }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/blog-details", children: "Best Experience Excellence: eSoft Revolutionises Email Outreach ...." }) })
    ] }) })
  ] }) }) });
};
const RightSide = () => {
  return /* @__PURE__ */ jsx(Col, { lg: 8, children: /* @__PURE__ */ jsxs("div", { className: "blog-details-all pl60", children: [
    /* @__PURE__ */ jsx("article", { children: /* @__PURE__ */ jsxs("div", { className: "details-box", children: [
      /* @__PURE__ */ jsx("div", { className: "image" }),
      /* @__PURE__ */ jsx("div", { className: "space20" }),
      /* @__PURE__ */ jsxs("div", { className: "all-tags", children: [
        /* @__PURE__ */ jsx(Link, { to: "", className: "tag", children: "#Email Marketing" }),
        /* @__PURE__ */ jsx(Link, { to: "", children: " 10 October 2023" }),
        /* @__PURE__ */ jsx(Link, { to: "", children: "10 October 2023" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space10" }),
      /* @__PURE__ */ jsxs("div", { className: "headding2", children: [
        /* @__PURE__ */ jsx("h2", { children: "Best Masterful Email Marketing Starts Here: Introducing eSoft" }),
        /* @__PURE__ */ jsx("div", { className: "space16" }),
        /* @__PURE__ */ jsx("p", { children: "Email marketing, where brilliance meets innovation. At Your SaaS Name, we're on an mission to transform the way you connect with your audience. Unleash the power of personalised, high-converting campaigns with our intuitive drag-and-drop editor." }),
        /* @__PURE__ */ jsx("div", { className: "space16" }),
        /* @__PURE__ */ jsx("p", { children: "Unleash the power of personalised, high-converting campaigns with our intuitive an drag-and-drop editor, smart segmentation, and powerful automation tools. Crafting emails that resonate has never been easier. Join a best community of marketers." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space40" }),
      /* @__PURE__ */ jsx("div", { className: "blog-border" }),
      /* @__PURE__ */ jsx("div", { className: "space40" })
    ] }) }),
    /* @__PURE__ */ jsx("article", { children: /* @__PURE__ */ jsxs("div", { className: "details-box", children: [
      /* @__PURE__ */ jsxs(Row, { children: [
        /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsx("div", { className: "image" }) }),
        /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsx("div", { className: "image" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space30" }),
      /* @__PURE__ */ jsxs("div", { className: "headding2", children: [
        /* @__PURE__ */ jsx("h5", { children: "Crafting Success: Your Email Marketing Email Brilliance Unleashed: Elevate Solution -eSoft" }),
        /* @__PURE__ */ jsx("div", { className: "space16" }),
        /* @__PURE__ */ jsx("p", { children: "Small business, or enterprise, eSoft has a plan tailored to your needs. Don't miss out on the email marketing revolution – sign up for a free trial today and experience the magic of Your SaaS Name. Engage, convert, succeed – your journey starts here." }),
        /* @__PURE__ */ jsx("div", { className: "space10" }),
        /* @__PURE__ */ jsxs(Row, { children: [
          /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsxs("ul", { className: "text-list", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaCheck, {}) }),
              "Increased Organic Traffic"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaCheck, {}) }),
              "In-Depth Analytics Dashboard"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaCheck, {}) }),
              "Content Optimization Tools"
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsxs("ul", { className: "text-list", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaCheck, {}) }),
              "Regular Performance Monitoring"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaCheck, {}) }),
              "Responsive Design for Any Device"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaCheck, {}) }),
              "Improved Search Engine Rankings"
            ] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space40" }),
      /* @__PURE__ */ jsx("div", { className: "blog-border" }),
      /* @__PURE__ */ jsx("div", { className: "space40" })
    ] }) }),
    /* @__PURE__ */ jsx("article", { children: /* @__PURE__ */ jsxs("div", { className: "details-box", children: [
      /* @__PURE__ */ jsxs("div", { className: "headding2", children: [
        /* @__PURE__ */ jsx("h5", { children: "Beyond the Inbox: Marketing Redefines Email Efficiency & Meets Innovation Strategies" }),
        /* @__PURE__ */ jsx("div", { className: "space16" }),
        /* @__PURE__ */ jsx("p", { children: "Our platform goes beyond the inbox, offering a seamless and efficient experience. See your campaigns come to life with our analytics dashboard, providing data-driven insights for informed decisions. Whether you're a startup, small business." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "comment-area", children: /* @__PURE__ */ jsx("p", { children: "“Transforming the ordinary into the extraordinary, eSoft is more than just an email marketing platform; it's your gateway to and impactful communication. Craft, target, automate, and analyse with ease, ensuring every email resonates.”" }) }),
      /* @__PURE__ */ jsxs("div", { className: "headding2", children: [
        /* @__PURE__ */ jsx("h5", { children: "Crafting Success: Your Email Marketing Email Brilliance Unleashed Elevate Solution -eSoft" }),
        /* @__PURE__ */ jsx("div", { className: "space16" }),
        /* @__PURE__ */ jsx("p", { children: "Small business, or enterprise, eSoft has a plan tailored to your needs. Don't miss out on the email marketing revolution – sign up for a free trial today and experience the magic of Your SaaS Name. Engage, convert, succeed – your journey starts here." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space40" }),
      /* @__PURE__ */ jsx("div", { className: "blog-border" }),
      /* @__PURE__ */ jsx("div", { className: "space20" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "social-area-all", children: [
      /* @__PURE__ */ jsxs("div", { className: "tags", children: [
        /* @__PURE__ */ jsx(Link, { to: "", className: "tag", children: "#Email Marketing" }),
        /* @__PURE__ */ jsx(Link, { to: "", className: "date", children: " 10 October 2023" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "social-icons", children: /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { className: "text", children: "Share:" }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "", children: /* @__PURE__ */ jsx(FaFacebookF, {}) }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "", children: /* @__PURE__ */ jsx(FaGooglePlusG, {}) }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "", children: /* @__PURE__ */ jsx(FaLinkedinIn, {}) }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "", children: /* @__PURE__ */ jsx(FaYoutube, {}) }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space20" }),
    /* @__PURE__ */ jsxs("div", { className: "qustion-box", children: [
      /* @__PURE__ */ jsx("div", { className: "image" }),
      /* @__PURE__ */ jsx("div", { className: "pera", children: /* @__PURE__ */ jsxs("p", { children: [
        "Questions? Comments? Visit Our ",
        /* @__PURE__ */ jsx(Link, { to: "", children: "Help Center" }),
        " For Support"
      ] }) })
    ] })
  ] }) });
};
const Details$1 = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "blog-details-sidebar", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Row, { children: [
    /* @__PURE__ */ jsx(LeftSide, {}),
    /* @__PURE__ */ jsx(RightSide, {})
  ] }) }) }) });
};
const Hero$9 = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "pages-hero pages-hero-unic", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Row, { className: "align-items-center", children: [
      /* @__PURE__ */ jsx(Col, { lg: 7, children: /* @__PURE__ */ jsxs("div", { className: "main-headding", children: [
        /* @__PURE__ */ jsx("h1", { children: "The Ultimate Email Campaign Playbook" }),
        /* @__PURE__ */ jsx("p", { children: "Where email marketing meets innovation. Say goodbye to generic campaigns and hello to personalised, high-converting emails that resonate with your audience." }),
        /* @__PURE__ */ jsx("div", { className: "space30" }),
        /* @__PURE__ */ jsxs("div", { className: "all-text-hero", children: [
          /* @__PURE__ */ jsxs("div", { className: "autor-area", children: [
            /* @__PURE__ */ jsx("div", { className: "image" }),
            /* @__PURE__ */ jsxs("div", { className: "headding", children: [
              /* @__PURE__ */ jsx("h5", { children: /* @__PURE__ */ jsx(Link, { to: "#", children: "Jonson Brans" }) }),
              /* @__PURE__ */ jsx("p", { children: "UI/UX Designer" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "tag", children: /* @__PURE__ */ jsx(Link, { to: "#", children: "#Email Marketing" }) }),
          /* @__PURE__ */ jsx("div", { className: "date", children: /* @__PURE__ */ jsx(Link, { to: "#", children: "10 October 2023" }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Col, { lg: 5, children: /* @__PURE__ */ jsx("div", { className: "hero-image shape-animaiton3" }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "space60" })
  ] });
};
const blogList$1 = [
  {
    image: "1",
    /*blogImg1,*/
    dateIcon: "1",
    /*iconDate,*/
    authorIcon: "1",
    /*iconAuthor,*/
    date: "10 October 2023",
    author: "Rabby Mahmud",
    title: "The Ultimate Email Campaign Playbook",
    description: "Effortlessly design stunning emails, automate your market workflow, & precisely target your audience for maximum.",
    link: "/blog-details"
  },
  {
    image: "2",
    /*blogImg2,*/
    dateIcon: "2",
    /*iconDate,*/
    authorIcon: "2",
    /*iconAuthor,*/
    date: "10 October 2023",
    author: "Rabby Mahmud",
    title: "Email Design: A Deep Dive in Visual Impact",
    description: "Effortlessly design stunning emails, automate your market workflow, & precisely target your audience for maximum.",
    link: "/blog-details"
  }
];
const More$1 = () => {
  return /* @__PURE__ */ jsx("div", { className: "blog2 sp", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 6, className: "m-auto text-center", children: /* @__PURE__ */ jsxs("div", { className: "headding2", children: [
      /* @__PURE__ */ jsx("h2", { children: "Our Latest Blog & News" }),
      /* @__PURE__ */ jsx("div", { className: "space16" }),
      /* @__PURE__ */ jsx("p", { children: "Our dynamic Landing Pages redefine user experiences, eSoft ensuring every click counts, dive into the world of insightful." })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "space30" }),
    /* @__PURE__ */ jsx(Row, { children: blogList$1.map((item, i) => /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsxs("div", { className: "blog-box", children: [
      /* @__PURE__ */ jsx("div", { className: "image" }),
      /* @__PURE__ */ jsxs("div", { className: "headding", children: [
        /* @__PURE__ */ jsxs("div", { className: "tags", children: [
          /* @__PURE__ */ jsxs(Link, { to: "", children: [
            " ",
            item.date
          ] }),
          /* @__PURE__ */ jsxs(Link, { to: "", children: [
            " ",
            item.author
          ] })
        ] }),
        /* @__PURE__ */ jsx("h4", { children: /* @__PURE__ */ jsx(Link, { to: item.link, children: item.title }) }),
        /* @__PURE__ */ jsx("p", { children: item.description }),
        /* @__PURE__ */ jsxs(Link, { to: item.link, className: "learn", children: [
          "Read more",
          /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaArrowRight, {}) })
        ] })
      ] })
    ] }) }, i)) })
  ] }) });
};
const meta$i = () => {
  return [{ title: "Web Page Builder" }];
};
const index$b = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(MainLayout, { children: [
    /* @__PURE__ */ jsx(Hero$9, {}),
    /* @__PURE__ */ jsx(Details$1, {}),
    /* @__PURE__ */ jsx(More$1, {})
  ] }) });
};
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$b,
  meta: meta$i
}, Symbol.toStringTag, { value: "Module" }));
const Details = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "blog-details-sidebar", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 8, className: "m-auto", children: /* @__PURE__ */ jsxs("div", { className: "blog-details-all pr60", children: [
    /* @__PURE__ */ jsx("article", { children: /* @__PURE__ */ jsxs("div", { className: "details-box", children: [
      /* @__PURE__ */ jsx("div", { className: "image" }),
      /* @__PURE__ */ jsx("div", { className: "space20" }),
      /* @__PURE__ */ jsxs("div", { className: "all-tags", children: [
        /* @__PURE__ */ jsx(Link, { to: "", className: "tag", children: "#Email Marketing" }),
        /* @__PURE__ */ jsx(Link, { to: "", children: "10 October 2023" }),
        /* @__PURE__ */ jsx(Link, { to: "", children: "10 October 2023" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space10" }),
      /* @__PURE__ */ jsxs("div", { className: "headding2", children: [
        /* @__PURE__ */ jsx("h2", { children: "Best Masterful Email Marketing Starts Here: Introducing eSoft" }),
        /* @__PURE__ */ jsx("div", { className: "space16" }),
        /* @__PURE__ */ jsx("p", { children: "Email marketing, where brilliance meets innovation. At Your SaaS Name, we're on an mission to transform the way you connect with your audience. Unleash the power of personalised, high-converting campaigns with our intuitive drag-and-drop editor." }),
        /* @__PURE__ */ jsx("div", { className: "space16" }),
        /* @__PURE__ */ jsx("p", { children: "Unleash the power of personalised, high-converting campaigns with our intuitive an drag-and-drop editor, smart segmentation, and powerful automation tools. Crafting emails that resonate has never been easier. Join a best community of marketers." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space40" }),
      /* @__PURE__ */ jsx("div", { className: "blog-border" }),
      /* @__PURE__ */ jsx("div", { className: "space40" })
    ] }) }),
    /* @__PURE__ */ jsx("article", { children: /* @__PURE__ */ jsxs("div", { className: "details-box", children: [
      /* @__PURE__ */ jsxs(Row, { children: [
        /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsx("div", { className: "image" }) }),
        /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsx("div", { className: "image" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space30" }),
      /* @__PURE__ */ jsxs("div", { className: "headding2", children: [
        /* @__PURE__ */ jsx("h5", { children: "Crafting Success: Your Email Marketing Email Brilliance Unleashed: Elevate Solution -eSoft" }),
        /* @__PURE__ */ jsx("div", { className: "space16" }),
        /* @__PURE__ */ jsx("p", { children: "Small business, or enterprise, eSoft has a plan tailored to your needs. Don't miss out on the email marketing revolution – sign up for a free trial today and experience the magic of Your SaaS Name. Engage, convert, succeed – your journey starts here." }),
        /* @__PURE__ */ jsx("div", { className: "space10" }),
        /* @__PURE__ */ jsxs(Row, { children: [
          /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsxs("ul", { className: "text-list", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaCheck, {}) }),
              "Increased Organic Traffic"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaCheck, {}) }),
              "In-Depth Analytics Dashboard"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaCheck, {}) }),
              "Content Optimization Tools"
            ] })
          ] }) }),
          /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsxs("ul", { className: "text-list", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaCheck, {}) }),
              "Regular Performance Monitoring"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaCheck, {}) }),
              "Responsive Design for Any Device"
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaCheck, {}) }),
              "Improved Search Engine Rankings"
            ] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space40" }),
      /* @__PURE__ */ jsx("div", { className: "blog-border" }),
      /* @__PURE__ */ jsx("div", { className: "space40" })
    ] }) }),
    /* @__PURE__ */ jsx("article", { children: /* @__PURE__ */ jsxs("div", { className: "details-box", children: [
      /* @__PURE__ */ jsxs("div", { className: "headding2", children: [
        /* @__PURE__ */ jsx("h5", { children: "Beyond the Inbox: Marketing Redefines Email Efficiency & Meets Innovation Strategies" }),
        /* @__PURE__ */ jsx("div", { className: "space16" }),
        /* @__PURE__ */ jsx("p", { children: "Our platform goes beyond the inbox, offering a seamless and efficient experience. See your campaigns come to life with our analytics dashboard, providing data-driven insights for informed decisions. Whether you're a startup, small business." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "comment-area", children: /* @__PURE__ */ jsx("p", { children: "“Transforming the ordinary into the extraordinary, eSoft is more than just an email marketing platform; it's your gateway to and impactful communication. Craft, target, automate, and analyse with ease, ensuring every email resonates.”" }) }),
      /* @__PURE__ */ jsxs("div", { className: "headding2", children: [
        /* @__PURE__ */ jsx("h5", { children: "Crafting Success: Your Email Marketing Email Brilliance Unleashed Elevate Solution -eSoft" }),
        /* @__PURE__ */ jsx("div", { className: "space16" }),
        /* @__PURE__ */ jsx("p", { children: "Small business, or enterprise, eSoft has a plan tailored to your needs. Don't miss out on the email marketing revolution – sign up for a free trial today and experience the magic of Your SaaS Name. Engage, convert, succeed – your journey starts here." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space40" }),
      /* @__PURE__ */ jsx("div", { className: "blog-border" }),
      /* @__PURE__ */ jsx("div", { className: "space20" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "social-area-all", children: [
      /* @__PURE__ */ jsxs("div", { className: "tags", children: [
        /* @__PURE__ */ jsx(Link, { to: "", className: "tag", children: "#Email Marketing" }),
        /* @__PURE__ */ jsx(Link, { to: "", className: "date", children: "10 October 2023" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "social-icons", children: /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { className: "text", children: "Share:" }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "", children: /* @__PURE__ */ jsx(FaFacebookF, {}) }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "", children: /* @__PURE__ */ jsx(FaGooglePlusG, {}) }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "", children: /* @__PURE__ */ jsx(FaLinkedinIn, {}) }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "", children: /* @__PURE__ */ jsx(FaYoutube, {}) }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space20" }),
    /* @__PURE__ */ jsxs("div", { className: "qustion-box", children: [
      /* @__PURE__ */ jsx("div", { className: "image" }),
      /* @__PURE__ */ jsx("div", { className: "pera", children: /* @__PURE__ */ jsxs("p", { children: [
        "Questions? Comments? Visit Our ",
        /* @__PURE__ */ jsx(Link, { to: "", children: "Help Center" }),
        " For Support"
      ] }) })
    ] })
  ] }) }) }) }) }) });
};
const Hero$8 = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "pages-hero pages-hero-unic", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Row, { className: "align-items-center", children: [
      /* @__PURE__ */ jsx(Col, { lg: 7, children: /* @__PURE__ */ jsxs("div", { className: "main-headding", children: [
        /* @__PURE__ */ jsx("h1", { children: "The Ultimate Email Campaign Playbook" }),
        /* @__PURE__ */ jsx("p", { children: "Where email marketing meets innovation. Say goodbye to generic campaigns and hello to personalised, high-converting emails that resonate with your audience." }),
        /* @__PURE__ */ jsx("div", { className: "space30" }),
        /* @__PURE__ */ jsxs("div", { className: "all-text-hero", children: [
          /* @__PURE__ */ jsxs("div", { className: "autor-area", children: [
            /* @__PURE__ */ jsx("div", { className: "image" }),
            /* @__PURE__ */ jsxs("div", { className: "headding", children: [
              /* @__PURE__ */ jsx("h5", { children: /* @__PURE__ */ jsx(Link, { to: "", children: "Jonson Brans" }) }),
              /* @__PURE__ */ jsx("p", { children: "UI/UX Designer" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "tag", children: /* @__PURE__ */ jsx(Link, { to: "", children: "#Email Marketing" }) }),
          /* @__PURE__ */ jsx("div", { className: "date", children: /* @__PURE__ */ jsx(Link, { to: "", children: " 10 October 2023" }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Col, { lg: 5, children: /* @__PURE__ */ jsx("div", { className: "hero-image shape-animaiton3" }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "space60" })
  ] });
};
const blogList = [
  {
    image: "1",
    /*blogImg1,*/
    dateIcon: "1",
    /*iconDate,*/
    authorIcon: "1",
    /*iconAuthor,*/
    date: "10 October 2023",
    author: "Rabby Mahmud",
    title: "The Ultimate Email Campaign Playbook",
    description: "Effortlessly design stunning emails, automate your market workflow, & precisely target your audience for maximum.",
    link: "/blog-details"
  },
  {
    image: "2",
    /*blogImg2,*/
    dateIcon: "2",
    /*iconDate,*/
    authorIcon: "2",
    /*iconAuthor,*/
    date: "10 October 2023",
    author: "Rabby Mahmud",
    title: "Email Design: A Deep Dive in Visual Impact",
    description: "Effortlessly design stunning emails, automate your market workflow, & precisely target your audience for maximum.",
    link: "/blog-details"
  }
];
const More = () => {
  return /* @__PURE__ */ jsx("div", { className: "blog2 sp", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 6, className: "m-auto text-center", children: /* @__PURE__ */ jsxs("div", { className: "headding2", children: [
      /* @__PURE__ */ jsx("h2", { children: "Our Latest Blog & News" }),
      /* @__PURE__ */ jsx("div", { className: "space16" }),
      /* @__PURE__ */ jsx("p", { children: "Our dynamic Landing Pages redefine user experiences, eSoft ensuring every click counts, dive into the world of insightful." })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "space30" }),
    /* @__PURE__ */ jsx(Row, { children: blogList.map((item, i) => /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsxs("div", { className: "blog-box", children: [
      /* @__PURE__ */ jsx("div", { className: "image" }),
      /* @__PURE__ */ jsxs("div", { className: "headding", children: [
        /* @__PURE__ */ jsxs("div", { className: "tags", children: [
          /* @__PURE__ */ jsx(Link, { to: "", children: item.date }),
          /* @__PURE__ */ jsx(Link, { to: "", children: item.author })
        ] }),
        /* @__PURE__ */ jsx("h4", { children: /* @__PURE__ */ jsx(Link, { to: item.link, children: item.title }) }),
        /* @__PURE__ */ jsx("p", { children: item.description }),
        /* @__PURE__ */ jsxs(Link, { to: item.link, className: "learn", children: [
          "Read more",
          /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaArrowRight, {}) })
        ] })
      ] })
    ] }) }, i)) })
  ] }) });
};
const meta$h = () => {
  return [{ title: "Web Page Builder" }];
};
const index$a = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(MainLayout, { children: [
    /* @__PURE__ */ jsx(Hero$8, {}),
    /* @__PURE__ */ jsx(Details, {}),
    /* @__PURE__ */ jsx(More, {})
  ] }) });
};
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$a,
  meta: meta$h
}, Symbol.toStringTag, { value: "Module" }));
const FormSuccess = () => {
  useEffect(() => {
    document.body.classList.add("body2", "body");
    return () => {
      document.body.classList.remove("body2", "body");
    };
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "log-in-area Success _relative", children: /* @__PURE__ */ jsxs(Container, { children: [
      /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 6, className: "m-auto text-center", children: /* @__PURE__ */ jsx("div", { className: "main-logo", children: /* @__PURE__ */ jsx(Link, { to: "/home-1" }) }) }) }),
      /* @__PURE__ */ jsx("div", { className: "space80" }),
      /* @__PURE__ */ jsx(Row, { className: "align-items-center", children: /* @__PURE__ */ jsx(Col, { lg: 6, className: "m-auto", children: /* @__PURE__ */ jsxs("div", { className: "login-form", children: [
        /* @__PURE__ */ jsx("div", { className: "Success-icon  d-flex justify-content-center" }),
        /* @__PURE__ */ jsx("div", { className: "space20" }),
        /* @__PURE__ */ jsxs("div", { className: "headding", children: [
          /* @__PURE__ */ jsx("h2", { children: "Successfully Done!" }),
          /* @__PURE__ */ jsx("div", { className: "space30" }),
          /* @__PURE__ */ jsx("div", { className: "button", children: /* @__PURE__ */ jsx(Link, { to: "/home-1", className: "theme-btn2", children: "Go Back Home Page" }) })
        ] })
      ] }) }) })
    ] }) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "bg-area-all",
        style: {
          //backgroundImage: `url(${forgotBg})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "390px"
        }
      }
    )
  ] });
};
const meta$g = () => {
  return [{ title: "Web Page Builder" }];
};
const index$9 = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(FormSuccess, {}) });
};
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$9,
  meta: meta$g
}, Symbol.toStringTag, { value: "Module" }));
const Pagination = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { xs: 12, className: "m-auto", children: /* @__PURE__ */ jsx("div", { className: "theme-pagination text-center", children: /* @__PURE__ */ jsxs("ul", { children: [
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "", children: /* @__PURE__ */ jsx(FaAnglesLeft, {}) }) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { className: "active", to: "", children: "01" }) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "", children: "02" }) }),
    /* @__PURE__ */ jsx("li", { children: "..." }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "", children: "12" }) }),
    /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "", children: /* @__PURE__ */ jsx(FaAnglesRight, {}) }) })
  ] }) }) }) }) });
};
const TestimonialData$3 = [
  {
    title: "Pat Cummins",
    role: "Ceo Biosynthesis",
    des: "I can't imagine managing our email campaigns a without eSoft. The simplicity of creating visually stunning emails combined with powerful automation tools has been a game-changer for our marketing team. Our engagement rates have soared.",
    image: "1",
    //Tes2Img1,
    logo: "1"
    //Tes2Logo,
  },
  {
    title: "Pat Cummins",
    role: "Ceo Biosynthesis",
    des: "I can't imagine managing our email campaigns a without eSoft. The simplicity of creating visually stunning emails combined with powerful automation tools has been a game-changer for our marketing team. Our engagement rates have soared.",
    image: "2",
    //Tes2Img2,
    logo: "2"
    //Tes2Logo2,
  },
  {
    title: "Marcus Harris",
    role: "Ceo Biosynthesis",
    des: `"We've been using eSoft for over a year now, and the experience has been nothing short of fantastic. The platform's user- best a friendly interface makes it a breeze to navigate, and the range of features has significantly streamlined our workflow.”`,
    image: "3",
    //Tes2Img3,
    logo: "3"
    //Tes2Logo3,
  },
  {
    title: "Josh Stones",
    role: "Ceo CouldWatch",
    des: `"Discovering eSoft was a game-changer for our business. The seamless integration and robust features have not only saved us time but have also significantly increased our productivity. The level of customisation available allows us to tailor the eSoft”`,
    image: "4",
    //Tes2Img4,
    logo: "4"
    //Tes2Logo4,
  },
  {
    title: "Ruben Dias",
    role: "Ceo Biosynthesis",
    des: "I can't imagine managing our email campaigns a without eSoft. The simplicity of creating visually stunning emails combined with powerful automation tools has been a game-changer for our marketing team. Our engagement rates have soared.",
    image: "5",
    //Tes2Img5,
    logo: "5"
    //Tes2Logo5,
  },
  {
    title: "Rodrigo Paul",
    role: "Ceo CouldWatch",
    des: `"eSoft has exceeded our expectations in every way. The ease with which we can target specific audience segments has an transformed our approach to email marketing. The automation features have saved us countless hours, allowing us to focus”`,
    image: "6",
    // Tes2Img6,
    logo: "6"
    //Tes2Logo6,
  },
  {
    title: "Pat Cummins",
    role: "Ceo Biosynthesis",
    des: `"Discovering eSoft was a game-changer for our business. The seamless integration and robust features have not only saved us time but have also significantly increased our productivity. The level of customisation available allows us to tailor the eSoft”`,
    image: "7",
    // Tes2Img7,
    logo: "7"
    //Tes2Logo6,
  },
  {
    title: "Marcus Harris",
    role: "Ceo Biosynthesis",
    des: `"We've been using eSoft for over a year now, and the experience has been nothing short of fantastic. The platform's user- best a friendly interface makes it a breeze to navigate, and the range of features has significantly streamlined our workflow.”`,
    image: "8",
    //Tes2Img8,
    logo: "8"
    // Tes2Logo2,
  }
];
const Blog$1 = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Row, { children: TestimonialData$3.map((item, idx) => /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsxs("div", { className: "single-slider-page", children: [
    /* @__PURE__ */ jsxs("ul", { className: "stars", children: [
      /* @__PURE__ */ jsx("li", { style: { marginRight: "3px" }, children: /* @__PURE__ */ jsx(FaStar, { size: 18 }) }),
      /* @__PURE__ */ jsx("li", { style: { marginRight: "3px" }, children: /* @__PURE__ */ jsx(FaStar, { size: 18 }) }),
      /* @__PURE__ */ jsx("li", { style: { marginRight: "3px" }, children: /* @__PURE__ */ jsx(FaStar, { size: 18 }) }),
      /* @__PURE__ */ jsx("li", { style: { marginRight: "3px" }, children: /* @__PURE__ */ jsx(FaStar, { size: 18 }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(FaStar, { size: 18 }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "icon" }),
    /* @__PURE__ */ jsx("p", { children: item.des }),
    /* @__PURE__ */ jsxs("div", { className: "single-slider-bottom", children: [
      /* @__PURE__ */ jsxs("div", { className: "headdding-area", children: [
        /* @__PURE__ */ jsx("div", { className: "image" }),
        /* @__PURE__ */ jsxs("div", { className: "headding", children: [
          /* @__PURE__ */ jsx("h5", { children: /* @__PURE__ */ jsx(Link, { to: "#", children: item.title }) }),
          /* @__PURE__ */ jsx("p", { children: item.role })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "logo" })
    ] })
  ] }) }, idx)) }) });
};
const TestimonialData$2 = [
  { image: "1" },
  //Logo1 },
  { image: "2" },
  //Logo2 },
  { image: "3" },
  //Logo3 },
  { image: "4" },
  //Logo4 },
  { image: "5" },
  //Logo5 },
  { image: "6" },
  //Logo1 },
  { image: "7" },
  //Logo2 },
  { image: "8" },
  //Logo3 },
  { image: "9" },
  //Logo4 },
  { image: "10" }
  //Logo5 },
];
const sliderData = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: "Oliver Grioud",
  role: "CEO",
  company: "Lava Ltd",
  message: `“The team at WebDock Studio not only delivered what was promised but also provided valuable insights that added immense value to our project, on your needs an Based on your needs, we devise. The support team is exceptional! They've been responsive and helpful at every step.”`,
  image: "1"
  //Tes1,
}));
const Testimonial$2 = () => {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const sliderRef1 = useRef(null);
  const sliderRef2 = useRef(null);
  useEffect(() => {
    setNav1(sliderRef1.current);
    setNav2(sliderRef2.current);
  }, []);
  const setting1 = {
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    loop: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 2
        }
      }
    ]
  };
  const setting2 = {
    margin: "30",
    slidesToShow: 1,
    arrows: false,
    centerMode: true,
    loop: true,
    draggable: true,
    fade: true,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1
        }
      }
    ]
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "testimonial-page sp", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 7, className: "m-auto text-center", children: /* @__PURE__ */ jsxs("div", { className: "common-main-headding", children: [
      /* @__PURE__ */ jsx("h1", { children: "Client Feedback" }),
      /* @__PURE__ */ jsx("p", { children: "At Webdock Studio, we value your inquiries and are here to provide the support you need. Whether you're looking for more information an about our cutting." })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "space60" }),
    /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 12, children: /* @__PURE__ */ jsx("div", { className: "testimonial-slider-all", children: /* @__PURE__ */ jsxs("div", { className: "testimonial-single-slider", children: [
      /* @__PURE__ */ jsx(Slider, { ref: sliderRef1, asNavFor: nav2, ...setting1, className: "tes1-brads-slider", children: TestimonialData$2.map((item, idx) => /* @__PURE__ */ jsx("div", { className: "single-logo" }, idx)) }),
      /* @__PURE__ */ jsx(Slider, { ref: sliderRef2, asNavFor: nav1, ...setting2, className: "tes1-big-slider", children: sliderData.map((item, idx) => /* @__PURE__ */ jsx("div", { className: "single-slider", children: /* @__PURE__ */ jsxs(Row, { children: [
        /* @__PURE__ */ jsxs(Col, { lg: 8, children: [
          /* @__PURE__ */ jsxs("ul", { className: "stars", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(FaStar, {}) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(FaStar, {}) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(FaStar, {}) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(FaStar, {}) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(FaStar, {}) })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "pera", children: item.message }),
          /* @__PURE__ */ jsxs("div", { className: "bottom-headding", children: [
            /* @__PURE__ */ jsx("h4", { children: /* @__PURE__ */ jsxs(Link, { to: "", children: [
              item.name,
              "/",
              item.role,
              ", ",
              item.company
            ] }) }),
            /* @__PURE__ */ jsx("p", { children: "Read More Testimonials Feedback" })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Col, { lg: 4, children: /* @__PURE__ */ jsx("div", { className: "image" }) })
      ] }) }, idx)) }),
      /* @__PURE__ */ jsxs("div", { className: "testimonial-arrows", children: [
        /* @__PURE__ */ jsx("button", { className: "testimonial-prev-arrow", onClick: () => {
          var _a;
          return (_a = sliderRef2.current) == null ? void 0 : _a.slickPrev();
        }, children: /* @__PURE__ */ jsx(FaArrowLeft, {}) }),
        /* @__PURE__ */ jsx("button", { className: "testimonial-next-arrow", onClick: () => {
          var _a;
          return (_a = sliderRef2.current) == null ? void 0 : _a.slickNext();
        }, children: /* @__PURE__ */ jsx(FaArrowRight, {}) })
      ] })
    ] }) }) }) }),
    /* @__PURE__ */ jsx("div", { className: "space60" }),
    /* @__PURE__ */ jsx(Blog$1, {}),
    /* @__PURE__ */ jsx("div", { className: "space50" }),
    /* @__PURE__ */ jsx(Pagination, {})
  ] }) }) });
};
const meta$f = () => {
  return [{ title: "Web Page Builder" }];
};
const page$2 = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(MainLayout, { children: /* @__PURE__ */ jsx(Testimonial$2, {}) }) });
};
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: page$2,
  meta: meta$f
}, Symbol.toStringTag, { value: "Module" }));
const systemIcon1 = "data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M30%2031L26%2025V18C26%2015.3333%2020.9333%2012.4813%2019%2011'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M21%2019.4988L16.0306%2015.5195C15.6976%2015.1869%2015.2461%2015%2014.7753%2015C14.3044%2015%2013.8529%2015.1869%2013.52%2015.5195C13.187%2015.8521%2013%2016.3032%2013%2016.7736C13%2017.0065%2013.0459%2017.2371%2013.1351%2017.4523C13.2243%2017.6674%2013.3551%2017.863%2013.52%2018.0277L18.3341%2023.4537V26.856C18.3341%2028.4632%2020.6322%2031%2020.6322%2031'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M18.9867%2027.232C18.9298%2027.719%2018.696%2028.1681%2018.3298%2028.494C17.9635%2028.82%2017.4903%2029%2017%2029H5C4.46957%2029%203.96086%2028.7893%203.58579%2028.4142C3.21071%2028.0391%203%2027.5304%203%2027V3C3%202.46957%203.21071%201.96086%203.58579%201.58579C3.96086%201.21071%204.46957%201%205%201H17C17.5304%201%2018.0391%201.21071%2018.4142%201.58579C18.7893%201.96086%2019%202.46957%2019%203V17.6667'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M11.0054%2019C10.3366%2018.9991%209.67867%2018.8315%209.09143%2018.5123C8.5042%2018.1931%208.00631%2017.7325%207.64309%2017.1725C7.27986%2016.6124%207.06282%2015.9707%207.01172%2015.3056C6.96063%2014.6406%207.07709%2013.9733%207.35052%2013.3646C7.62395%2012.7559%208.04566%2012.2251%208.57727%2011.8204C9.10889%2011.4157%209.73354%2011.15%2010.3944%2011.0475C11.0552%2010.945%2011.7313%2011.009%2012.361%2011.2335C12.9907%2011.4581%2013.5541%2011.8362%2014%2012.3333'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M6.5%204C6.59889%204%206.69556%204.02932%206.77778%204.08427C6.86001%204.13921%206.9241%204.2173%206.96194%204.30866C6.99978%204.40002%207.00969%204.50055%206.99039%204.59755C6.9711%204.69454%206.92348%204.78363%206.85355%204.85355C6.78363%204.92348%206.69454%204.9711%206.59754%204.99039C6.50055%205.00969%206.40002%204.99978%206.30866%204.96194C6.2173%204.9241%206.13921%204.86001%206.08427%204.77779C6.02932%204.69556%206%204.59889%206%204.5C6%204.36739%206.05268%204.24021%206.14645%204.14645C6.24022%204.05268%206.36739%204%206.5%204Z'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M15.5%2025C15.5989%2025%2015.6956%2025.0293%2015.7778%2025.0843C15.86%2025.1392%2015.9241%2025.2173%2015.9619%2025.3087C15.9998%2025.4%2016.0097%2025.5006%2015.9904%2025.5975C15.9711%2025.6945%2015.9235%2025.7836%2015.8536%2025.8536C15.7836%2025.9235%2015.6945%2025.9711%2015.5975%2025.9904C15.5006%2026.0097%2015.4%2025.9998%2015.3087%2025.9619C15.2173%2025.9241%2015.1392%2025.86%2015.0843%2025.7778C15.0293%2025.6956%2015%2025.5989%2015%2025.5C15%2025.3674%2015.0527%2025.2402%2015.1464%2025.1464C15.2402%2025.0527%2015.3674%2025%2015.5%2025Z'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";
const systemIcon2 = "data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_3_19521)'%3e%3cpath%20d='M10.9999%2023H3.99994C3.46951%2023%202.9608%2022.7893%202.58573%2022.4142C2.21065%2022.0391%201.99994%2021.5304%201.99994%2021V10C1.99994%209.46957%202.21065%208.96086%202.58573%208.58579C2.9608%208.21071%203.46951%208%203.99994%208H28.9999C29.5304%208%2030.0391%208.21071%2030.4142%208.58579C30.7892%208.96086%2030.9999%209.46957%2030.9999%2010V21.6667'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M7.99994%2026L8.99994%2027.6271V31'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M10.9999%206.15208C10.9999%205.58131%2010.7892%205.03392%2010.4142%204.63033C10.0391%204.22674%209.53037%204%208.99994%204C8.46951%204%207.9608%204.22674%207.58573%204.63033C7.21065%205.03392%206.99994%205.58131%206.99994%206.15208V8'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M14.9999%208V4.97994C14.9999%204.45482%2014.7892%203.95122%2014.4142%203.57991C14.0391%203.2086%2013.5304%203%2012.9999%203C12.4695%203%2011.9608%203.2086%2011.5857%203.57991C11.2107%203.95122%2010.9999%204.45482%2010.9999%204.97994V8'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M18.9999%208V3C18.9999%202.46957%2018.7892%201.96086%2018.4142%201.58579C18.0391%201.21071%2017.5304%201%2016.9999%201C16.4695%201%2015.9608%201.21071%2015.5857%201.58579C15.2107%201.96086%2014.9999%202.46957%2014.9999%203V8'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M22.9999%208V4.97994C22.9999%204.45482%2022.7892%203.95122%2022.4142%203.57991C22.0391%203.2086%2021.5304%203%2020.9999%203C20.4695%203%2019.9608%203.2086%2019.5857%203.57991C19.2107%203.95122%2018.9999%204.45482%2018.9999%204.97994V6.35005'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M20.972%2031V29.6667C20.9699%2029.2563%2021.0614%2028.8509%2021.2395%2028.4812C21.4176%2028.1115%2021.6777%2027.7874%2022%2027.5333L24.972%2025.1333C25.294%2024.8791%2025.554%2024.5549%2025.7321%2024.1853C25.9102%2023.8156%2026.0018%2023.4103%2026%2023V16.9587C25.9967%2016.4455%2025.7934%2015.9539%2025.4334%2015.5881C25.0734%2015.2224%2024.585%2015.0114%2024.072%2015C22.4%2015%2022.072%2016.8867%2022.0573%2016.9533L21.6773%2019.7093C21.625%2020.1069%2021.4837%2020.4876%2021.264%2020.823C21.0442%2021.1584%2020.7516%2021.44%2020.408%2021.6467L18.296%2022.8987C17.8979%2023.1395%2017.5692%2023.4795%2017.3421%2023.8855C17.1149%2024.2914%2016.997%2024.7495%2017%2025.2147V27'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M12.2967%2017.8672C12.6117%2018.2347%2013.0218%2018.5293%2013.4922%2018.7261C13.9627%2018.9229%2014.4796%2019.0161%2014.9992%2018.9977C16.6559%2018.9977%2017.9999%2018.1023%2017.9999%2016.9989C17.9999%2015.8954%2016.6559%2015.0013%2014.9992%2015.0013C13.3425%2015.0013%2011.9999%2014.1059%2011.9999%2013.0012C11.9999%2011.8965%2013.3439%2011.0024%2014.9992%2011.0024C15.5189%2010.9836%2016.0359%2011.0767%2016.5064%2011.2735C16.9769%2011.4703%2017.387%2011.7652%2017.7018%2012.1329'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M14.9999%2020V21'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M14.9999%2010V11'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_3_19521'%3e%3crect%20width='32'%20height='32'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
const systemIcon3 = "data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_3_19491)'%3e%3cpath%20d='M7.12346%2013.1572L6.09499%209.82888C5.93458%209.30986%205.97861%208.74576%206.21738%208.26053C6.45616%207.7753%206.87016%207.40864%207.3684%207.24112L25.6807%201.09879C26.1793%200.931808%2026.7211%200.977842%2027.1871%201.22677C27.6531%201.47571%2028.0051%201.90716%2028.1657%202.42627L30.9048%2011.2798C30.9844%2011.5369%2031.0145%2011.8079%2030.9935%2012.0772C30.9725%2012.3465%2030.9008%2012.6089%2030.7824%2012.8493C30.6641%2013.0898%2030.5014%2013.3036%2030.3036%2013.4785C30.1059%2013.6534%2029.877%2013.7861%2029.63%2013.8689L23.2761%2016'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M23%2025V28.428C22.999%2028.7668%2022.9312%2029.1021%2022.8006%2029.4147C22.6699%2029.7274%2022.479%2030.0112%2022.2387%2030.25C21.9984%2030.4888%2021.7134%2030.678%2021.3999%2030.8067C21.0865%2030.9354%2020.7508%2031.0011%2020.412%2031H3.588C3.24919%2031.0011%202.91349%2030.9354%202.60007%2030.8067C2.28664%2030.678%202.00164%2030.4888%201.76132%2030.25C1.521%2030.0112%201.33008%2029.7274%201.19945%2029.4147C1.06882%2029.1021%201.00105%2028.7668%201%2028.428V15.5707C1.00105%2015.2319%201.06883%2014.8967%201.19947%2014.5842C1.33012%2014.2716%201.52106%2013.9879%201.7614%2013.7492C2.00173%2013.5104%202.28675%2013.3214%202.60017%2013.1929C2.91358%2013.0643%203.24925%2012.9988%203.588%2013H20.412C20.7507%2012.9988%2021.0864%2013.0643%2021.3998%2013.1929C21.7132%2013.3214%2021.9983%2013.5104%2022.2386%2013.7492C22.4789%2013.9879%2022.6699%2014.2716%2022.8005%2014.5842C22.9312%2014.8967%2022.999%2015.2319%2023%2015.5707V19'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M6%2013V31'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M18.7705%2019C18.0061%2019.0319%2017.2856%2019.3656%2016.7667%2019.9279C16.2478%2020.4902%2015.9729%2021.2353%2016.0021%2022C15.9729%2022.7647%2016.2478%2023.5098%2016.7667%2024.0721C17.2856%2024.6344%2018.0061%2024.9681%2018.7705%2025H23.6154C23.9974%2024.9837%2024.3574%2024.8168%2024.6167%2024.5357C24.8759%2024.2546%2025.0134%2023.8822%2024.9989%2023.5V20.5C25.0137%2020.1177%2024.8764%2019.7451%2024.6171%2019.464C24.3577%2019.1828%2023.9975%2019.0159%2023.6154%2019H18.7705Z'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M21.5%2021C21.5989%2021%2021.6956%2021.0293%2021.7778%2021.0843C21.86%2021.1392%2021.9241%2021.2173%2021.9619%2021.3087C21.9998%2021.4%2022.0097%2021.5006%2021.9904%2021.5975C21.9711%2021.6945%2021.9235%2021.7836%2021.8536%2021.8536C21.7836%2021.9235%2021.6945%2021.9711%2021.5975%2021.9904C21.5006%2022.0097%2021.4%2021.9998%2021.3087%2021.9619C21.2173%2021.9241%2021.1392%2021.86%2021.0843%2021.7778C21.0293%2021.6956%2021%2021.5989%2021%2021.5C21%2021.3674%2021.0527%2021.2402%2021.1464%2021.1464C21.2402%2021.0527%2021.3674%2021%2021.5%2021Z'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M16%209.75261C16.1964%209.50601%2016.505%209.30288%2016.8854%209.16975C17.2659%209.03663%2017.7005%208.97971%2018.1326%209.00643C18.5646%209.03315%2018.974%209.14227%2019.3071%209.31953C19.6403%209.49679%2019.8818%209.73394%2020%2010'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_3_19491'%3e%3crect%20width='32'%20height='32'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
const systemIcon4 = "data:image/svg+xml,%3csvg%20width='32'%20height='32'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_3_19542)'%3e%3cpath%20d='M11%2022.3333V29.6667C11%2030.403%2011.597%2031%2012.3333%2031H25.6667C26.403%2031%2027%2030.403%2027%2029.6667V22.3333C27%2021.597%2026.403%2021%2025.6667%2021H12.3333C11.597%2021%2011%2021.597%2011%2022.3333Z'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M15%2021.3424L15.8627%2017.5735C15.9225%2017.3109%2016.0306%2017.0635%2016.1807%2016.8452C16.3308%2016.6269%2016.52%2016.4421%2016.7375%2016.3013C16.955%2016.1605%2017.1966%2016.0666%2017.4484%2016.0248C17.7003%2015.983%2017.9574%2015.9942%2018.2051%2016.0577L29.5162%2018.9522C29.7639%2019.0157%2029.9973%2019.1303%2030.2032%2019.2894C30.4091%2019.4485%2030.5833%2019.6491%2030.716%2019.8796C30.8488%2020.11%2030.9373%2020.366%2030.9767%2020.6327C31.0161%2020.8995%2031.0055%2021.1718%2030.9455%2021.4342L29.5796%2027.4275C29.5133%2027.7182%2029.3879%2027.99%2029.2122%2028.224C29.0366%2028.458%2028.8148%2028.6486%2028.5625%2028.7824C28.3102%2028.9163%2028.0333%2028.9902%2027.7513%2028.9991C27.4692%2029.008%2027.1887%2028.9515%2026.9294%2028.8337'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M19.4999%2026C19.5987%2026%2019.6954%2026.0293%2019.7776%2026.0843C19.8598%2026.1392%2019.9238%2026.2173%2019.9617%2026.3087C19.9995%2026.4%2020.0094%2026.5006%2019.9901%2026.5975C19.9708%2026.6945%2019.9232%2026.7836%2019.8533%2026.8536C19.7834%2026.9235%2019.6943%2026.9711%2019.5974%2026.9904C19.5004%2027.0097%2019.3999%2026.9998%2019.3086%2026.9619C19.2172%2026.9241%2019.1392%2026.86%2019.0842%2026.7778C19.0293%2026.6956%2019%2026.5989%2019%2026.5C19%2026.3674%2019.0527%2026.2402%2019.1464%2026.1464C19.2401%2026.0527%2019.3673%2026%2019.4999%2026Z'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M1%2023C1.00104%2021.579%201.34422%2020.1785%202.00149%2018.9128C2.65876%2017.6471%203.61147%2016.5522%204.78176%2015.7175C5.95205%2014.8829%207.30671%2014.3321%208.73504%2014.1104C10.1634%2013.8886%2011.6248%2014.0021%2013%2014.4415'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M5%204C5.83602%204.94899%206.83817%205.70375%207.94658%206.2192C9.055%206.73464%2010.2469%207.0002%2011.4512%207C12.6715%207.0009%2013.8791%206.72886%2015%206.20057'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M10.5%2012C13.5376%2012%2016%209.53757%2016%206.5C16%203.46243%2013.5376%201%2010.5%201C7.46243%201%205%203.46243%205%206.5C5%209.53757%207.46243%2012%2010.5%2012Z'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_3_19542'%3e%3crect%20width='32'%20height='32'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
const span = "data:image/svg+xml,%3csvg%20width='20'%20height='20'%20viewBox='0%200%2020%2020'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cx='10'%20cy='10'%20r='10'%20fill='%237371FC'/%3e%3cpath%20d='M10.5004%204C8.83382%204.99401%207.16722%205.98803%205.50049%206.98204L5.50063%209.53819C6.80509%2010.3163%208.10955%2011.0943%209.41402%2011.8722L10.8425%2011.0203L6.9291%208.68638V7.834L9.07209%206.55585L10.5004%205.70405L15.5003%208.68609V6.9819L10.5004%204Z'%20fill='white'/%3e%3cpath%20d='M10.5001%204L15.5%206.9819V8.6858L9.07178%204.85195L10.5001%204Z'%20fill='white'/%3e%3cpath%20d='M9.07174%204.85156L10.5001%205.70337L5.5%208.68541L5.50028%206.98151L9.07174%204.85156Z'%20fill='white'/%3e%3cpath%20d='M9.07174%204.85156L10.5001%205.70337L5.5%208.68541L5.50028%206.98151L9.07174%204.85156Z'%20fill='white'/%3e%3cpath%20opacity='0.3'%20d='M10.0556%205.9685L10.5001%205.70337L9.07178%204.85156L10.0556%205.9685Z'%20fill='white'/%3e%3cpath%20d='M6.92875%207.83398V10.3903L5.50028%209.53832L5.5%208.68608L6.92875%207.83398Z'%20fill='white'/%3e%3cpath%20d='M6.92875%207.83398V10.3903L5.50028%209.53832L5.5%208.68608L6.92875%207.83398Z'%20fill='white'/%3e%3cpath%20opacity='0.45'%20d='M5.5%208.68608L6.92875%208.30508V7.83398L5.5%208.68608Z'%20fill='white'/%3e%3cpath%20d='M6.92896%208.6875L13.4187%2012.5581L11.9286%2013.4469L6.92896%2010.3914V8.6875Z'%20fill='white'/%3e%3cpath%20opacity='0.25'%20d='M6.92896%208.6875V10.3914L7.32355%2010.6267L6.92896%208.6875Z'%20fill='white'/%3e%3cpath%20d='M10.4999%2015.9992C12.1667%2015.0052%2013.8331%2014.0112%2015.4999%2013.0171L15.4997%2010.461C14.1953%209.68289%2012.8908%208.90492%2011.5863%208.12695L10.1579%208.9789L14.0712%2011.3128V12.1652L11.9283%2013.4433L10.4999%2014.2953L5.5%2011.3132V13.0171L10.4999%2015.9992Z'%20fill='white'/%3e%3cpath%20d='M10.4999%2016.0004L5.5%2013.0184V11.3145L11.9284%2015.1484L10.4999%2016.0004Z'%20fill='white'/%3e%3cpath%20d='M11.928%2015.1484L10.4995%2014.2965L15.4996%2011.3145L15.4994%2013.0184L11.928%2015.1484Z'%20fill='white'/%3e%3cpath%20d='M11.928%2015.1484L10.4995%2014.2965L15.4996%2011.3145L15.4994%2013.0184L11.928%2015.1484Z'%20fill='white'/%3e%3cpath%20opacity='0.3'%20d='M10.9441%2014.0312L10.4995%2014.2964L11.928%2015.1483L10.9441%2014.0312Z'%20fill='white'/%3e%3cpath%20d='M14.071%2012.1676V9.61133L15.4994%2010.4633L15.4997%2011.3155L14.071%2012.1676Z'%20fill='white'/%3e%3cpath%20d='M14.071%2012.1676V9.61133L15.4994%2010.4633L15.4997%2011.3155L14.071%2012.1676Z'%20fill='white'/%3e%3cpath%20opacity='0.45'%20d='M15.4997%2011.3145L14.071%2011.6954V12.1665L15.4997%2011.3145Z'%20fill='white'/%3e%3cpath%20d='M14.0714%2011.3139L7.58154%207.44334L9.07174%206.55469L14.0714%209.60999V11.3139Z'%20fill='white'/%3e%3cpath%20opacity='0.25'%20d='M14.0711%2011.3142V9.61033L13.6765%209.375L14.0711%2011.3142Z'%20fill='white'/%3e%3c/svg%3e";
const systemImg1 = "/assets/system9-img1-Dm0NWaMn.png";
const systemImg2 = "/assets/system9-img2-mdhtEnkR.png";
const shape1$1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJkAAABKCAYAAACo9vY7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQkSURBVHgB7dpNTxNBHMfxmdliQYsP0XC1xBdgXwJEEg8eKAcTqAdAwJh4EF8B5RWoN4MY4QIkHoCjiQbw6qXvgIZ4wYQIWhAWdsb/YIeUh91CSrf78PsmTTvTLqcP093Z8mKxuMoYSzNUS8V0Ot3O0JkJhmrOcRyLniyGzowzVFOpVKpNymZLCMspldY3aMph6Fj476sx27Z3k0nRLKVlJZOtzba9vUvTiqGjgKz2FKB5B2SXE6B5BGSXF6C5BGSXG6CdEZBdfoB2IiCrT4BWEZDVL0ArB2T1DdAYkPlR7KEBmT/FGhqQ+VdsoQGZv8USGpD5X+ygAVljihU0IGtcsYEGZI0tFtCArPFFHhqQBaNIQwOy4BRZaEAWrCIJDciCV+SgAVkwixQ0IAtukYEGZMEuEtCALPiFHhqQhaNQQwOy8BRaaEAWrkIJDcjCV+igAVk4CxU0IAtvoYEGZOEuFNCALPwFHhqQRaNAQwOy6BRYaEAWrQIJDciiV+CgAVk0CxQ0IItugYEGZNEuENCALPo1HBqQxaOGQgOy+NQwaEAWrxoCDcjil+/QgCye+QoNyOKbb9CALN75Ag3IUN2hARnS1RUakCFT3aABGaqsLtA4Q+h0ViqVui1lsyWE5ZRK6xs05+g3eof/dAhL9DPJOmiYLn++oB9KOouzH64vnPxjQIbcOgat69H31pbrdyaZkvq9RZWwFubetRT1IDdSytBshnMxxpVict/unJu6VWQInSMNre3Bw4WuvqGttd6hrVfVDugbLo32PdtZfUzwzBxWMuRZtn/tXkvixtLPH0tPv37OfqMpu9oxemVTXMwre+9wRUswhDy6euX2F8ex3xCwFRru6zl9Xsa5NSaUJEz8pmJ8mTM5PfM+NaXfp+cCrWhveVPyIw07sZIh1/qGfmeZlXg9O3G13czlhrfH6Psvf+YBXORnJlrGzfDJSGnJUWpcMIRc4sLqVkoeoaGvwQFXYDol83qVM0Op2KLgoh/IkGucqYzzf3uiPGb9VY+hr1HzWl+B0lMHkCHX6Fwr84nOryrGHdWO0TDN6/IWRxrI0EXaPMdnbp6cADLkVTH3Qt01A1qlCtUO0Fea5nV5r6wAZMg1pdSK2tvuMWN9pVj1GNrKMK+b6C4AAzLklWJqii4xu814brJ1mVVcbZ6Ks/G58l5ZeWJM388EMuSaRiXoTjjdJho1czOTrXnJ1CDdo1wuT23SircsleycmbiWN5/Ljey8pI1apm+YYzMWedb7/G+aS7V0oGRP5ZWmV7mBXxnWdGVeWqJTX2FiJUOeaSScgCXoXmTliuaWXsE0MPqy7TG/0sBKhs6VWdH0T3kI0DjdxCyYlU2/Zx04WanP35TUm7CDBpgOyNCFOryfyUWW4Nyn7X2z8Vqkhz4vmz68ODjRP53gmBSH1nIDAAAAAElFTkSuQmCC";
const shape2$1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJkAAABKCAMAAACfKAYJAAAAP1BMVEUAAAAKChQMDBFZZfZZZfVZZPVXZfNaZfVZZfRYZPNXY/NaZfVaZfVZY/JaZfRaZfVaZPRBS7QLCxEMDBJaZfU/9opqAAAAFHRSTlMAGRbgv3Agn2BAMO+AUDDPz0QtKnBp5fYAAAEMSURBVGje7dXBasMwEIThaXYlWXLsJO2+/7MWGyc09DRgyB7mA198MMtvpMVJLl8nu+AkP99JJ9u+lNIl62AqpmL/qBhLxVgqxlIxloqxVIylYiwVY6kYS8VYKsZSMZaKsVSMpWIsFWOpGEvFWCrGUjGWirFUjKViLBX7hN4s4taWbINV91KBdTKrqQYbVnAo9kg0WLUVLw+rSGMv1n0On7ZqjiwWA3CN3RWAdyTRJmCKQwdKQxL3AXgcHKiGJGJ7nub9RRIBYI6nTJNZff+b44YkWgF6HLbTkOYEdH+/NWxBFl4ATB6zdwAlzdEEqg28jEzbCevfjb4ik2o2DaAW90zFdku7R1hLszI3v+8gCo6te4GiAAAAAElFTkSuQmCC";
const shape3 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJsAAABICAYAAADhy4cNAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAVbSURBVHgB7d3NThtXFAfwc2dsApgPQ1AQlarSRddF3XQLTxBYtAK6gLRQVeoieQNgX6nNrqJUJRtASqWEJ4D2CfIISO2iVdsY8AfGZu7tOcbjGlMyzow/Zsb/n4SYmXiULP46d+aeE1AE4MPiWnbWsq0V0jTLp9PVy6/ky2jncP/HkZeN9ygCeAuLq5lplbz3Exktp4cmYb88+H7gRE6W13MzfHVGKWtDGUO6XJo72B07ce9F2KBpy6uZGUr2vTDGPN3fGfruTZ9dWss9Ict6fGX0wvMfhqTiIWzQHKloVrLviMgs7FXD40UqnVHWC1O6rFS4BAE0QYJWrWi1oMlzm1L2hmU0h0qlDaljRfoZh3FX/lxCyRXuaWXZJZpDZQNPS1+cz5Od+HZ/e/B999ryWn6D18XN/71BWZt72wNb7uln67kjx5gtiwA8KMt+aIyuhYeXx9U7gyaM3pSq555qQ4eWslYQNvCkyMw419sa1XNa8byHl1f3WN5Y+dsswgae+Fls5nndSwGfz3rdIwF1j6tbI9MIG/hx2sRn0o0XEDZoxsny1+Y994SrlufWh7yZusef8BYIf3uFsIEn3vL4xVzmF9xzebP0vIe3QNzjJHcVCGGDZhgyu/xK+tA9P9gZPqa6t9NbFG0dVPfaqhc2pF+KsIEnCZfFHfelLwtP3Gt7O8Obmswj7oEeVy+dcgU81kbP7W2nNt3PLa8XHvOGL0ljHpu60JTFry6mlTZH9b1OL24vVdvWnLyRorJBUzgsv73+49fP+fnrsL7C3UUqmgRNeqnuVAgqGzTDHhqavK+1Y3/08TfvvPvBpz/LCBEHaavMD/5upZPqZ18581qe74yWzdxHbtAEwgZeakGz7ctyNpv9h6+ZSr9UWfMcoA+5XeBu4J7wlzy3Pau8RDRA2OBNkqnUg3Hui1r1QSOfMGIEd+njoI1J0AoFp0CUPaOAbAJoMDU1Nah1/xgXMXUdtEzgoAkso3DD5ORkKpt1RuS4UFBZor9y1CIIG9RMTEwMFwo0JMetDppA2KCi3UET2NSFhqD1n7YjaAJh63FpJkFT6kJfB+33C2oTLKO9S3HORkulxIAELZ/Pv+ZrZWojbH30JjU8PHX/6oruWVbR4aBlqM1Bq/ylBL3G5qCNOU45KUHL5XLSFXCoAxC23lLrc3Y6aAJh6x1dDVrlH0DQC25MbnDQ/uZrmjoMlS3+apMbhULpkuhcXgZ8T24EgamPeGuY3DhvSUPdLyyjMXVzckPniTLn1GVYRmOonZMbQSBsMdOJhrpfCFuMhDloAo34mOjU5EYQCFsMdHJyIwgso9HW8cmNILD1EV1dmdwIApUtmro2uREEwhY9XW+o+4WwRUtkgybwzBYdoZjcCAKVLRpCM7kRBCpb6E33p1J9dZMbZ838pO5QQthC7Hpyo5gO0+RGEFhGQyqskxtBIGwhFPaGul/ojYbMzaDZ53EJmkBlC5Hx8fGRYtFKyXGYG+p+IWwhIZMbdQ11+b8CRYoZhK371OjoaLpcTvZHYXIjCGx9dFfkJjeCQGXrnkhObgSBsHVHpBvqfmEZ7bzGhro8o8U+aAKVrbOSHLSxxt+WQj0CYeucusmNcrHaUO+ZoAksox0gDXVjBtP/TW6cRnZyIwj8YJk2k6CdnZVH5fi6z5mJTfvpbWEZbaO4NtT9QtjaBEG7DVMfbRDnyY0gUNlaLO6TG0EgbC3UMLkhfc4SQQ3C1hrcUB8ed5x7fXGf3AgC+2zBVSY3HEf1VSc3pCtwRXCL4vbJA2mfEPjiOKVUImHz0ln+s1ca6n7xpm6ev/UT+GNZiaLDikUEzcu/DN7tIQT3mfQAAAAASUVORK5CYII=";
const shape4 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJsAAABICAYAAADhy4cNAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAViSURBVHgB7d3PThtXFAbwc+8wMwbsJmkXXZY3KI8AT5CwqBS8CW1JVKmLpOoDAG/Q7KqWKrAhSF0ATwBVN91UyhNUSK1adZEmasHGnpl7e87Y4wwEsAnYnj/fT4LMXHuyiD7dO/eeI0XROe4v/zenHf2ADM3x7Ux3+IX8WBPtPf/hvV0CuCKVvrm/9GpGuf4zskZu9+yEs7v97eSh3NQfHs3y6KxSekVZSyZoz29v3DkkgAH1wlZfejVLrrdjrX36fL36zWUPLS4fPSGtH4fWLPz4ffUFAQwgDpvMaNr19onswtaA4ZGZziq9Y9stzHAwkAn5JUHrzmi9oMl7m1LOiraGQ6VuW1IHiswmh3FDPpdQ8gz3NF52ieYJoA+9+Pm/9zhMlF4668vHK1rpfUV2ToImY3LNv5/VHzVXku/JM5p3ERJMAuiDM+XctdasJQO8PC5xslYvfMKa1XS4jKU9/kseEEAfmmes2ahzrBHjl7i+wZHlNbmWHSv/MUcAfWh+F5tN7yj5fq7fQxLQ5Lp7NDJDAH3oc8ZeU3+3CeCKJGyH9S/tR8kAz1p9jz5kZ5pcf8JHIJRahgEuovnI4yfbOl5IBiJr1/o9xPWDzeTa5aoCIWwwAH5nsxuk9N1kYHu9dkCp3elbFK1td8/augMrUi8lgD60hEvOyhYfNZ4kg1vrtVVD9lOugR50h17zDHhgrJnf+m56Nfle/WHjcXxGh8I8DKBTrvqiOaOM3b9KrTOppRpHzyfFeoDLxLtRCYvioE1wrTM9w11EZjSacHdf/vnzZ/zs7wQwgNMtRt0ZTlqIeBuwFvCLfzLTyWdOGN0z8n5nDf3x287Xv/7y1V9aO9HR0d8v+SsRAVxCnTco9VLeNNzjDz/mckFygHvIP/LethlvIoicWq12J4p8F4GDQSi6Hs2Bez8VuH94LCSAczh0Pbbdbjemp72JMFSe51Ung+C4xeOGAM64bthiJywIKtp1yXfdqekgaMhyihkOTrmRsHU0W0EwTd3AVYKgxruM44AAum4wbKLRfhM469+6NaUajUabAOjGwybeBC4IyEPgIDGEsAkJXMPycorAQc+QwhYLZKPQeX8jr1ar6Gaz2SIorWGGTYQcuBYfiVTCkHw5IpGdK0EpDTtswvDZW9v3tR+GnlepOBU+m2sSlM4owiYMB+yEA1cxpjLBgfP5XpZUS1AaowqbsOnA+X6NZ7hjWVIRuJIYZdhEKnCOg8CVy6jDJuLA8VLqGaMxw5XIOMIm0oFzUcAvh3GFTUjgmnIcEkW9jhGppaInrqDGGbbYmY6RKXSMFNfYw9aBjpEyyEjYBDpGii5DYRPoGCmyjIVNxB0jvQI+AlccGQxbTAr4Ee9QvSCwKOAXRFbDJkIp4EvHiByNTE25bosR5FaWwyZ6HSNR5HvdAj46RnIq62ET5kwBfxLlrXzKQ9gECvgFkJewCQQu5/IUNhHXU+XdDR0j+ZO3sIl4huPdabqAj46RHMhj2ITlU5CTMx0jKOBnXF7DFut0jEh5y1a44jCJjpFsy3XYOtIF/KkKylvZVYCwCRTw86AgYRMIXNYVKGwCHSNZVrCwxaRjJOQdqo+OkWwpYtgEOkYyqKhhE9IxEpe30DGSDUUOm7DoGMmOoodNoICfEWUIm0DgMqAsYRPoGBmzMoVNoGNkjMoWNoGOkTEpY9hi6BgZvdKGrQMdI6NU8rAJFPBHBWGLIXCjgLD1oGNk2BC209AxMkQI29tOdYx0C/gI3A1A2M7X6xjhAr6LjpGbcd3/I77onGq1+oG17odhaBqO4zYI3onWToSZ7XJxeYtL95P8j9VWSqGO+o6Uatr/Af+haPPdPJzdAAAAAElFTkSuQmCC";
const Benefit$1 = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "buy-sell-bottom2", id: "system", children: [
      /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 6, className: "m-auto text-center", children: /* @__PURE__ */ jsxs("div", { className: "heading9", children: [
        /* @__PURE__ */ jsxs("span", { className: "span", "data-aos": "zoom-in-left", "data-aos-duration": "700", children: [
          /* @__PURE__ */ jsx("img", { src: span, alt: "" }),
          " eSoft Benefits"
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "text-anime-style-3", children: "eSoft HR Use Of Benefits" })
      ] }) }) }) }),
      /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx("div", { className: "bg", children: /* @__PURE__ */ jsxs(Row, { className: "align-items-center", children: [
        /* @__PURE__ */ jsxs(Col, { lg: 3, children: [
          /* @__PURE__ */ jsxs("div", { className: "box-area-all", "data-aos": "flip-right", "data-aos-duration": "900", children: [
            /* @__PURE__ */ jsx("div", { className: "icon", children: /* @__PURE__ */ jsx("img", { src: systemIcon1, alt: "" }) }),
            /* @__PURE__ */ jsxs("div", { className: "single-box heading7", children: [
              /* @__PURE__ */ jsx("h5", { children: /* @__PURE__ */ jsx(Link, { to: "", children: "Trade Local Currency" }) }),
              /* @__PURE__ */ jsx("div", { className: "space10" }),
              /* @__PURE__ */ jsx("p", { children: "With our intuitive interface and robust features, you buy, sell." })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space50" }),
          /* @__PURE__ */ jsxs("div", { className: "box-area-all box-area-all2", "data-aos": "flip-right", "data-aos-duration": "900", children: [
            /* @__PURE__ */ jsx("div", { className: "icon", children: /* @__PURE__ */ jsx("img", { src: systemIcon2, alt: "" }) }),
            /* @__PURE__ */ jsxs("div", { className: "single-box heading7", children: [
              /* @__PURE__ */ jsx("h5", { children: /* @__PURE__ */ jsx(Link, { to: "", children: "Largest Coin Offer" }) }),
              /* @__PURE__ */ jsx("div", { className: "space10" }),
              /* @__PURE__ */ jsx("p", { children: "Plus, our commitment to the security means that PayCoin." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsxs("div", { className: "service1-main-images", "data-aos": "zoom-out", "data-aos-duration": "900", children: [
          /* @__PURE__ */ jsx("div", { className: "main-img1", children: /* @__PURE__ */ jsx("img", { src: systemImg1, alt: "" }) }),
          /* @__PURE__ */ jsx("div", { className: "main-img2 animate1", children: /* @__PURE__ */ jsx("img", { src: systemImg2, alt: "" }) }),
          /* @__PURE__ */ jsx("div", { className: "shape1", children: /* @__PURE__ */ jsx("img", { src: shape1$1, alt: "" }) }),
          /* @__PURE__ */ jsx("div", { className: "shape2", children: /* @__PURE__ */ jsx("img", { src: shape2$1, alt: "" }) }),
          /* @__PURE__ */ jsx("div", { className: "shape3", children: /* @__PURE__ */ jsx("img", { src: shape3, alt: "" }) }),
          /* @__PURE__ */ jsx("div", { className: "shape4", children: /* @__PURE__ */ jsx("img", { src: shape4, alt: "" }) })
        ] }) }),
        /* @__PURE__ */ jsxs(Col, { lg: 3, children: [
          /* @__PURE__ */ jsxs("div", { className: "box-area-all box-area-all3", "data-aos": "flip-right", "data-aos-duration": "900", children: [
            /* @__PURE__ */ jsx("div", { className: "icon", children: /* @__PURE__ */ jsx("img", { src: systemIcon3, alt: "" }) }),
            /* @__PURE__ */ jsxs("div", { className: "single-box heading7", children: [
              /* @__PURE__ */ jsx("h5", { children: /* @__PURE__ */ jsx(Link, { to: "", children: "Safe And Secure" }) }),
              /* @__PURE__ */ jsx("div", { className: "space10" }),
              /* @__PURE__ */ jsx("p", { children: "Trusted partner in the world of crypto trading Join us today." })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space50" }),
          /* @__PURE__ */ jsxs("div", { className: "box-area-all box-area-all4", "data-aos": "flip-right", "data-aos-duration": "900", children: [
            /* @__PURE__ */ jsx("div", { className: "icon", children: /* @__PURE__ */ jsx("img", { src: systemIcon4, alt: "" }) }),
            /* @__PURE__ */ jsxs("div", { className: "single-box heading7", children: [
              /* @__PURE__ */ jsx("h5", { children: /* @__PURE__ */ jsx(Link, { to: "", children: "Trade For Anywhere" }) }),
              /* @__PURE__ */ jsx("div", { className: "space10" }),
              /* @__PURE__ */ jsx("p", { children: "Resources designed to help navigate best the dynamic" })
            ] })
          ] })
        ] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space100" })
  ] });
};
const Counter$2 = () => {
  const [CountUp, setCountUp] = useState(null);
  useEffect(() => {
    import("react-countup").then((mod) => {
      setCountUp(() => mod.default);
    });
  }, []);
  if (!CountUp) return null;
  return /* @__PURE__ */ jsx("div", { className: "counters6", id: "counters", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Row, { children: [
    /* @__PURE__ */ jsx(Col, { lg: 3, xs: 6, children: /* @__PURE__ */ jsxs("div", { className: "counter-box box1", "data-aos": "zoom-out", "data-aos-duration": "800", children: [
      /* @__PURE__ */ jsx("h2", { children: /* @__PURE__ */ jsx("span", { className: "counter", children: /* @__PURE__ */ jsx(CountUp, { end: 16, suffix: " M+" }) }) }),
      /* @__PURE__ */ jsx("p", { children: "Built With Elementor" })
    ] }) }),
    /* @__PURE__ */ jsx(Col, { lg: 3, xs: 6, children: /* @__PURE__ */ jsxs("div", { className: "counter-box box2", "data-aos": "zoom-out", "data-aos-duration": "1000", children: [
      /* @__PURE__ */ jsx("h2", { children: /* @__PURE__ */ jsx("span", { className: "counter", children: /* @__PURE__ */ jsx(CountUp, { end: 6.5, decimals: 1, suffix: " K+" }) }) }),
      /* @__PURE__ */ jsx("p", { children: "5 Star Reviews" })
    ] }) }),
    /* @__PURE__ */ jsx(Col, { lg: 3, xs: 6, children: /* @__PURE__ */ jsxs("div", { className: "counter-box box3", "data-aos": "zoom-out", "data-aos-duration": "1100", children: [
      /* @__PURE__ */ jsx("h2", { children: /* @__PURE__ */ jsx("span", { className: "counter", children: /* @__PURE__ */ jsx(CountUp, { end: 100, suffix: "+" }) }) }),
      /* @__PURE__ */ jsx("p", { children: "5 Star Reviews" })
    ] }) }),
    /* @__PURE__ */ jsx(Col, { lg: 3, xs: 6, children: /* @__PURE__ */ jsxs("div", { className: "counter-box box4", "data-aos": "zoom-out", "data-aos-duration": "600", children: [
      /* @__PURE__ */ jsx("h2", { children: /* @__PURE__ */ jsx("span", { className: "counter", children: /* @__PURE__ */ jsx(CountUp, { end: 16, suffix: "Sec." }) }) }),
      /* @__PURE__ */ jsx("p", { children: "15 Second An Elementor" })
    ] }) })
  ] }) }) });
};
const cta2bg = "/assets/cta2-bg-5kgCZAZw.png";
const Cta2main = "/assets/cta2-main-img-BKh6pmWz.png";
const cta2shape1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA2CAMAAABUWfHRAAAAM1BMVEUAAAD///////////////////////////////////////////////////////////////+3leKCAAAAEHRSTlMA3yAQn2BAv+9/MJDPsHBQjqwqhAAAATdJREFUSMfllM2OwzAIhAE7/m/C+z/tOlGrHjA4sbR72e9YaTJ4mAK/iqsxrOg8c3ILdtxZMNy4s+D36rLX4pjb340Z18akxTFzlyE8B7vOjyexHn1wp4zfjcVeXoMBgZnjJBVNl6xKM+p1IM3uSkUPbLO6QvrL63QJkip6JOzUDaFuF82onWoXQCOdjdDtVJoIVNipu80gcBM7qOOw87vRKvvwu5Tk5+Q7cDg9k6ULIx2xZmfr8PyRpro02kGGp3502d04yHEQygETjhhJTCBCmePUUGyqcaLdFvSTqRezoBrzlWUi9ehzMqbchwtrfNKsv4fEVb5opM6JJFU5MU9KZKhagfuUjyrtD0qwR37j3U1J2SryhxhuaTyewykq83h8SdnBTfxXVE0rWcQO+r3AMygUgv/KD3xFFnnRHDrqAAAAAElFTkSuQmCC";
const cta2shape2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAMAAABlApw1AAAANlBMVEUAAAD////////////////////////////////////////////////////////////////////xY8b8AAAAEXRSTlMAIEDfv4AQ759wYDCvkM9Qj0BGEfEAAAVASURBVHja7ZzpjuMgDIAxJlwhB+//sqvdbUvaJhxpA1Ty93M0U9ngG08ZQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRA7SODc/oXzEdgvIUezOvTPKOGGZWTdI5d19hFmbTvWQhrhM0BnezSpIH0O89rZRfBV+UJQ96MDF/4UaLqwpX3xUWg9/GfSYj66IGFZZdLiKzEt8O4jfBnEnhq4trwGcK8nasbo7y96J8zqZioY9SK9zFHaOvVmSU1UAPFkOYMsMDyNL3ZXQYPo8Yul2Hm03zKxykixFZ+f+ggrNh/B6gIbE0B+/mN0oxvgamP7n52ExX+HUNcH7FfjhxU41ZV/CMffPJF+Jr/oopY5L//EfpFg/4b9IuPD/Dn7RUDd5e+nHSkB8LflZ49a+EflfwSgnwz/mwA0lNseAOccQLKGAJ6Qf7Sre+qI1exWw5socpffsUx46ILfUGKoq0VwAISvjYrEWjGZgL+RI78c0Oehqg0aMb+AkIPyJQh7uTGFCKSzxC9GX21LgLkOsCc+zkL/wx3P6HC41JR0Zgbj89uYzo7yJbJy42a/w8ouAzINaHiWfopESm5CjC1NkOcvAPInXcqlzZpP87PG7CIg64RGPDGnA7vVml2EzvFgq4rED4DBi6dbEjMuwPgHDsrnjJcOSG3GBQz+s14TrE5c2+dJWGedv5CsN3g6BC2bSNgfOllFg+q6VbtZ0BKpM7oetdzMAyNX1Peo4iaeTjvwwroEE4MUUH2PGnnKglzH8ecvU2ISbf1dw0651Vo8ZmHnywDJ7aqdmFEIoYcrxi0yUegO5x1AWo0745aVywtcQKRaza/uFwkL354GmcQFACsCUkMjlFVcINR5J1+HA5d1lyraKtnEBZwfu7jv+vD8vQvg6HPQ3/VhnSi0C30qgNost71YGBczCX/GqdKNikmXSeUrIl4YOBi34PLlPMyjFsSzvTdzbgHsa7hYJccLcwBg/tziy696cQsql3+qIn6IoipeaJfKj5xVIxZFxyILkthiRUTGKiFTZEFrkxURiMnoShpJ02LuEvJYzAVk3o5FA/mDAlOsyih8oq0LjxwbLxDJ5lbJNRUw+a0Y5PadFRUIVUbRC1uKmgqI7LIRikrkOlEoVBnFL2xpKuWB7CAE9SNoWoGQpLNycP3t4rSUkB1FsdUFBDvBmHukWJp5QDg9lRegEl1DfUKokecVkA33HMPxjecVWNoOr4fDFGozFdANXz+CmNP5G8CGFhTaRndagbGlBQUXxHirkHYBzVqBR0F8zJNsav0Aro8EgDwFRFMXCG3LFK8y0oOlqqSdMIiGJcVUE9RRLsacfoBX6+XLE5HLqdGW9o/g5sgIdM5cy/jmWzj3YkyemkoMHayBiCBoeYoawuiiMmkbgpymWHegQCjoD+JT7wrcbWg4egPvXoGbDSmZvYUQmHpQQKog6d4eSO9O/JACDzZxZOxP2+eBzWjNljuB7WOdTuxfwZDOBEsf/zrN99eyxrQNQftibnsFShavGnSyEcj3B8xDIg4FHZuvtIuQjnf0kp1nsk0gEnlJOmD68OJHSvVmN0lHjK99T/mcjhU8/zSZqFQnTnDw1Dslo4zoI5Vt/Hh9tpDUFZhebOhgzV6Ee4m3Ex18DYv1N3gyQ2wRvThBiEQKkkn6TcWZdcBj6Qrh/QpctKTGDiwouMGzyTufSrZgeQ8GtD1ub9+1wl6EjGJ2fHb4qe9L2hu1zZ3UzAXDXuyz3snDzvi6N2x66Nw/NSzVQbXzARJ+IgYRBEEQBEEQBEEQBEEQBEEQbfgDMkLC6ooVDdoAAAAASUVORK5CYII=";
const CTA$2 = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "cta2-area",
        style: {
          backgroundImage: `url(${cta2bg})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        },
        children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 6, className: "m-auto text-center", children: /* @__PURE__ */ jsxs("div", { className: "headding2-w pbmit-heading-subheading animation-style2", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-anime-style-3", children: "Join 500,000+ SEO's Who Trust eSoft For Insights That Help Their Business Grow." }),
          /* @__PURE__ */ jsx("div", { className: "space16" }),
          /* @__PURE__ */ jsx("p", { "data-aos": "fade-up", "data-aos-duration": "800", children: "eSoft has exceeded our expectations in every way. The ease with & which we can target specific audience segments has an transform." }),
          /* @__PURE__ */ jsx("div", { className: "space30" }),
          /* @__PURE__ */ jsx("div", { className: "", "data-aos": "fade-up", "data-aos-duration": "1000", children: /* @__PURE__ */ jsx(Link, { to: "/account", className: "theme-btn3", children: "Get Started For Free" }) })
        ] }) }) }) })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "cta2-main-image", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 12, children: /* @__PURE__ */ jsxs("div", { className: "cta2-images", children: [
      /* @__PURE__ */ jsx("div", { className: "img1", children: /* @__PURE__ */ jsx("img", { src: Cta2main, alt: "" }) }),
      /* @__PURE__ */ jsx("div", { className: "shape1", children: /* @__PURE__ */ jsx("img", { src: cta2shape2, alt: "" }) }),
      /* @__PURE__ */ jsx("div", { className: "shape2", children: /* @__PURE__ */ jsx("img", { src: cta2shape1, alt: "" }) })
    ] }) }) }) }) })
  ] });
};
const hero1 = "/assets/hero9-img1-DcKdVthN.png";
const hero2 = "data:image/png;base64,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";
const hero3 = "/assets/hero9-img3-DnMEhlxs.png";
const hero4 = "/assets/hero9-img4-D9JEC1zs.png";
const hero5 = "data:image/png;base64,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";
const heroMain = "/assets/hero9-main-DiJQtVes.png";
const heroImages$1 = [
  { className: "image1", image: hero1 },
  { className: "image2 shape-animaiton3", image: hero2 },
  { className: "image3 shape-animaiton2", image: hero3 },
  { className: "image4 animate1", image: hero4 },
  { className: "image5", image: hero5 },
  { className: "main-img", image: heroMain }
];
const Hero$7 = () => {
  useEffect(() => {
    document.body.classList.add("body", "rtl-body");
    document.documentElement.setAttribute("dir", "rtl");
    return () => {
      document.body.classList.remove("body", "rtl-body");
      document.documentElement.removeAttribute("dir");
    };
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "hero-area9", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Row, { className: "align-items-center", children: [
    /* @__PURE__ */ jsx(Col, { lg: 5, children: /* @__PURE__ */ jsxs("div", { className: "main-heading", children: [
      /* @__PURE__ */ jsxs("span", { className: "span", "data-aos": "zoom-in-left", "data-aos-duration": "700", children: [
        /* @__PURE__ */ jsx("img", { src: span, alt: "Span" }),
        " Keep track of your employee data"
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-anime-style-3", children: "Effortless Employee Management For A Growing Businesses" }),
      /* @__PURE__ */ jsx("div", { className: "space16" }),
      /* @__PURE__ */ jsx("p", { children: "Managing your people is easy with Quip HR’s user-friendly and mobile-ready HR software, discover key features via." }),
      /* @__PURE__ */ jsx("div", { className: "space30" }),
      /* @__PURE__ */ jsx("div", { className: "buttons", children: /* @__PURE__ */ jsxs(Link, { to: "/account", className: "theme-btn15", children: [
        "Get quip free now",
        /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaArrowRight, {}) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(Col, { lg: 7, children: /* @__PURE__ */ jsx("div", { className: "main-images", children: heroImages$1.map((item, idx) => /* @__PURE__ */ jsx("div", { className: item.className, children: /* @__PURE__ */ jsx("img", { src: item.image, alt: `Hero image ${idx + 1}` }) }, idx)) }) })
  ] }) }) });
};
const img1 = "data:image/png;base64,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";
const img2 = "/assets/work-prosses7-img2-Cj5SzSG6.png";
const img3 = "data:image/png;base64,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";
const img4 = "/assets/work-prosses7-img4-B8frOODy.png";
const img5 = "/assets/work-prosses7-img5-BJdu3QTC.png";
const processItems$1 = [
  {
    title: "Al-Powered Productivity",
    desc: "With an intuitive interface and powerful features, our platform simplifies collaboration, allowing you to effortlessly delegate.",
    image: img1,
    className: "left-top",
    duration: "800",
    col: 6
  },
  {
    title: "View Work Your Way",
    desc: "Team's project management experience. Our robust suite & offers a unified hub an task allocation, collaboration, project.",
    image: img2,
    className: "right-top",
    duration: "1000",
    col: 6
  },
  {
    title: "Search Anythings",
    desc: "With integrated file sharing & version control, your team a access manage",
    image: img3,
    className: "right-top",
    duration: "900",
    col: 4
  },
  {
    title: "Team Collaboration",
    desc: "Our platform brings together task an boards, share calendars, document.",
    image: img4,
    className: "left-bottom",
    duration: "1200",
    col: 4
  },
  {
    title: "Customized In Click",
    desc: "Empower your projects with a holistic workspace solution that a simplifies.",
    image: img5,
    className: "right-bottom",
    duration: "1200",
    col: 4
  }
];
const Process$1 = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "space100" }),
    /* @__PURE__ */ jsx("div", { className: "work-prosess9 sp _relative", id: "work-prosess", children: /* @__PURE__ */ jsxs(Container, { children: [
      /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 7, className: "m-auto text-center", children: /* @__PURE__ */ jsxs("div", { className: "heading9", children: [
        /* @__PURE__ */ jsxs("span", { className: "span", "data-aos": "zoom-in-left", "data-aos-duration": "700", children: [
          /* @__PURE__ */ jsx("img", { src: span, alt: "" }),
          " eSoft Workforce"
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "text-anime-style-3", children: " Empower Of HR Workforce" })
      ] }) }) }),
      /* @__PURE__ */ jsx("div", { className: "space30" }),
      /* @__PURE__ */ jsx(Row, { children: processItems$1.map((item, idx) => /* @__PURE__ */ jsx(Col, { lg: item.col, children: /* @__PURE__ */ jsx("div", { className: `work-box-area ${item.className}`, children: /* @__PURE__ */ jsxs("div", { className: "single-box", "data-aos": "zoom-in-up", "data-aos-duration": item.duration, children: [
        /* @__PURE__ */ jsxs("div", { className: "heading7", children: [
          /* @__PURE__ */ jsx("h4", { children: /* @__PURE__ */ jsx(Link, { to: "", children: item.title }) }),
          /* @__PURE__ */ jsx("div", { className: "space16" }),
          /* @__PURE__ */ jsx("p", { children: item.desc })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space40" }),
        /* @__PURE__ */ jsx("div", { className: "image", children: /* @__PURE__ */ jsx("img", { src: item.image, alt: item.title }) })
      ] }) }) }, idx)) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "space100" })
  ] });
};
const HrImg = "/assets/hr-solution-img-BF4gzgGS.png";
const Solution$1 = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "hr-solutions", id: "hr-solution", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Row, { children: [
    /* @__PURE__ */ jsx(Col, { lg: 7, children: /* @__PURE__ */ jsx("div", { className: "image", children: /* @__PURE__ */ jsx("img", { src: HrImg, alt: "" }) }) }),
    /* @__PURE__ */ jsx(Col, { lg: 5, children: /* @__PURE__ */ jsxs("div", { className: "heading9", children: [
      /* @__PURE__ */ jsxs("span", { className: "span", "data-aos": "zoom-in-left", "data-aos-duration": "700", children: [
        /* @__PURE__ */ jsx("img", { src: span, alt: "" }),
        " HR Solution"
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "text-anime-style-3", children: "Powerful Features For Effective HR Solutions" }),
      /* @__PURE__ */ jsx("div", { className: "space16" }),
      /* @__PURE__ */ jsx("p", { "data-aos": "fade-left", "data-aos-duration": "700", children: "Experience a new level of efficiency with our all-in-one HR software solution. Our intuitive platform is built to simplify your workflow, automating tedious tasks and providing powerful tools for seamless HR management." }),
      /* @__PURE__ */ jsx("div", { className: "space30" }),
      /* @__PURE__ */ jsx("div", { className: "", "data-aos": "fade-left", "data-aos-duration": "1000", children: /* @__PURE__ */ jsxs(Link, { to: "", className: "theme-btn15", children: [
        "Get quip free now",
        /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaArrowRight, {}) })
      ] }) })
    ] }) })
  ] }) }) }) });
};
const TestIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAMFBMVEUAAABrXv9sW/9rXf9pW/9qW/9oXf9xVf9qXP9pW/9qW/9rXP9lWv9rX/9tW/9qXP/QtDeEAAAAD3RSTlMATB1AoJ9gCZBw388wKw55kH9EAAAAaElEQVQoz2MYSUAJCAoYmNPS0pIRgoJAoMDA8v///6+DWpCBWVCwAEjN//8DSfChoDCI2v//D5LgRUEhIMn0//8CJEFDQXEgyfn/fwNCjE9Q0ABIcf//fwAhyAu0HEjp//9FE8uHJwAAsQNFvZfOod4AAAAASUVORK5CYII=";
const Test2Logo1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK0AAAApCAMAAABwUFm/AAAAk1BMVEUAAAAQGCgQGCgQGCgQGCgQGCgQGCgQFykQECAQGCgQFykQGCgQFSYQFiYQFycQGSkQFydRif9lWfJ4OOt4Oe94OOt4Oe94Oe93Oe14OO1wTPBQh/9SjP9Si/9TiP9Ri/9Si/93Oe5Si/9Ri/9Si/94Oe53OO1Qiv95Ou4QGCh4Oe5Si/90QvBVhP5dcftoXPZuTfIu8lCRAAAAKXRSTlMAYL+fQN8g7xCAcJAwUM8fr0AQQN8gn7+QXDAg79+vmnDvz7+AgHBgz9KfwogAAAOlSURBVFjD7ZjZdpswEIaFNiQZCHXc7PvWgrP0/Z+umhlkIWwX+4708J+ToG2kT6PRQMJmzZo163/Tz1OvJfsOurpYtajzy59s4lqetVGrVzZpnT62iX5P2b2X7VCrKeIur6+vfci221qlt804USkuSihLzjk7QIUf5/yPxFq5sRKcixHTHUssX57XXjd3q3aHLlhPLm9ISjOW+echtNKPg58F1mpfKqCgqSlqwbllqbaXeLhZk77anTqNQ22zUa6Poj1RTVNhDfbr0MmwCdYTbxoxRnu/7vTxvpv2PLFtRCkz5Z/VcbQL/8tgxYtjIID5UbQES/ps92gTuQCZhYkbuZmqyLJSY1RLSd7yT931SKKVna3Dg4G+CqjJuICn9A012ZkS7AKtkTA96Nd6oz/7aC+jj3DzIeY62rJqQLwfyYQmOYZ4BrQmpyjlOFjSFI6VCuuqhA6UZUY0ZEcTShwi4GBuR2njPbO0THBeQWwxlssBrQwhDrRAoxgzvlx7JALBKUhyQ6uRjsCxn8TBtVHtPp0xEmzZDINKAo7NBDxMSgurisypBmkdWMNw7nBpAfRw96SWClpF7luEKGvYEJhRsMUKuzuGlhNLSsspmyG1TWihYiEIFdIWuIOFjweN3ApOVwihaaY83LKiM9M5Bhu0UaNjT0f6dpuWpqO98IR2AQggh7QMVoerJQFUwvolXjJrLbiTaGm0xgznr18WknMFfeue3vfRvobsjaumtBq4Qq9KaD0CjxmMjh6GQ4m8ZpgO0RpoaZ7tDMaHtF9jOaE72pDj6xFaz1RFWjKHkMVSRXvBxM151aO14Ui2aCElHJ5vTY6vMJANgUnnC1JdJBjio0gwvUgwlB4slRSUyu6g3SASClxDCJfQ4i0be5edJS9eJf1qWNA4laDJiT98DdT9ilZEG1MtU13JdjDkW3A3bYWHi5XSPhwQCvGb0VSYPlUOD0fHpKFSCw789BHABfZnDNsE1IiWMnMXNXjeeOVlSS+RE4FhYRdkhg5JaZc3o869YFFGNKRNfsff8bPMUTHPgTak+Rpok0+EEpsxuaGqil7OIGGq+LpJaVPnfo5/32YcaWoZr4BG7+XWYL8CoqL2tNCDHSwnWnjSNTXofLQlQDA7IWPRTZLzgg1p2fMAd/xvB631v5qMNkkPG5Gm8akMtm5r+ZTgDoLhfHJ/6Lz0cT/6V+3xjU1P1/e3Ce9759e3qf4D5OpHIv+vmqupos6aNWvWd9RfTycJ2u9QIWkAAAAASUVORK5CYII=";
const Test2Logo2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALcAAAAoCAMAAACLgJs7AAAAn1BMVEUAAAAQGCgPFigPFCkQFygQFigQFygPFigQFygUFCc1OM00OMtFTtkNFSg1OM0QFygOFygyNco1OM40N80QFygQFygPGChgcO8QFyhgcfNhcvNhcvNhcvRhcvJgcPBhc/Q0OM41N82ju/w0OMyguPyftv+kvP2kvf2kvPukvPyhuvo0OM6kvP2kvP5hcvOju/w0OcxgcvM1OM1hcvOkvP1AIHarAAAAMnRSTlMAzDMZmYCyZkwN3yAQJoC/WTDP70BzjCCmXu+c34Ayz2WpSUkfEO/fkGAwv3XHv6iQcHpjjkoAAAQOSURBVFjD7Zlrl5owEIaH3CAKhbWo627turp2r72p//+3NTNMiBTtWlt6Sk/fD5vwkpDHSSaBs/AvaP14Bz3U3f1u9wKk4fNoAX3Rcrfb3VfYg81mcwE90aPj/sjYTivoiz7vPjy54oKwB9AfrdeI/Zawh666ur1N4W9Wen0zx7KJ/cZVvsBfrPRmu93O2thOI+hWVgiRnY/tNG9ho95AtxJRFGk4S9N3iH01PQ1bVMosXyc6+QPcYpzYw9jva+xR+gNsGXkp4o1dreicO8PxfhJ7mDa5g2J3rc6e58xN2oncFB3zU9jp82azaHIHCYDCFectFEMhPD3e44ZDKfnuOPYoHEGBW4JFXnpUGQvonBtkXDYNwp4exyazzQ1wGQbsnrutT4y9OI799uIQt6EFQvuvBZQo4jooNnF1STeFX8xC0lYt8A4aeRRdOoe4C61jGboWGdfdM0vysXvDgNmcsDevYwfuUiSYj5e4DbpSYJlHKBODU1Fd6AzLjINrCFFTq8wZTt68xGqODaViH+GyqpGSNGrsjNwbrNXr2O28HNvAHdeu3muj0I65VSIQjm/U3A0TJNvVz/UXxlbcwQDW6HXsNrcpam5B42oKVkFemSUmkjZ3VBZAuUJSo1hSRktlENioPTMH0BQOG9NkSryQpYoSjrfAp8vEOIM18Ngw8tjDgN3inugJIcaeW/HmEtPwJd5ytCUZPKymYSec0SLkZTClpFjyVWbxlgQogLllMFirwYbfWL947EEDu52XFCjB3DmbYLBiaT61wESi+dfo1luHanIHk2bEKKecfq7iY9lzByNoyGV6e7toYbe4fUzGzM1x8kyyTihCFgbZTuBOIi/itpoqJvPcUoekXbY+4pvY0/nsMLehEUO8rTcznA2NNVW1x6o4hbvEhSBYlo4bSgPOSzTGaBgLyx1+nJHmn+Zt7PdX+Ibb5pZjWuAH1rdxENiAViwBUZadwm0Rknh14rrSSYzjJMxNe/wEsx4+uo/hB0Bdb5EwYA889vZdg3tfcn8/MZoYE0efx5klbgQj8yRux0QBL3KOvs6sDtxJbZTw4LgfPfb2eg97SNjkHuOOD+/fOGrYZxVVTuO2JjzbWV5Sfm/A+vP9C2M7zZrYU8K+SQ9y50rsn5emMgvw6UNhAX5jPI07dDWuqx37n+D3QV0bqID9tYkNsxY2WMGSQJL77yeFsOwWEzUZYxPiy6lmuVdWdXF/s6ZZdS1j9xx+TDJ2jxHcigxNBupItFHpFWJ39wF5vo5jk6bXX38N2y+ATjRrY/82yQ7DPe8Mm89L6EL0jXnVEbZVSmnoStP3aRP75cP9Evqi5xr7budO/zX0RAOPDU87p978z2QR1vYDvrT0Rher1FeXT/BfHegbAAh45+tsm4IAAAAASUVORK5CYII=";
const TestImg = "data:image/png;base64,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";
const TestImg2 = "data:image/png;base64,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";
const TestimonialData$1 = [
  {
    des: `"I can't imagine managing our email campaigns a without eSoft. The simplicity of creating visually stunning emails combined with powerful automation tools has been a game-changer for our marketing team. Our engagement rates have soared."`,
    image: TestImg,
    logo: Test2Logo1
  },
  {
    des: `"eSoft has exceeded our expectations in every way. The ease with which we can target specific audience segments has an transformed our approach to email marketing. The automation features have saved us countless hours, allowing us to focus"`,
    image: TestImg2,
    logo: Test2Logo2
  },
  {
    des: `"I can't imagine managing our email campaigns a without eSoft. The simplicity of creating visually stunning emails combined with powerful automation tools has been a game-changer for our marketing team. Our engagement rates have soared."`,
    image: TestImg,
    logo: Test2Logo1
  },
  {
    des: `"eSoft has exceeded our expectations in every way. The ease with which we can target specific audience segments has an transformed our approach to email marketing. The automation features have saved us countless hours, allowing us to focus"`,
    image: TestImg2,
    logo: Test2Logo2
  }
];
const Testimonial$1 = () => {
  const setting = {
    slidesToShow: 2,
    margin: 30,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    loop: true,
    rtl: true,
    centerPadding: "40px",
    responsive: [
      {
        breakpoint: 769,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1
        }
      }
    ]
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "tes9 sp", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(Row, { className: "align-items-center", children: /* @__PURE__ */ jsx(Col, { lg: 6, className: "text-center m-auto", children: /* @__PURE__ */ jsxs("div", { className: "heading9", children: [
      /* @__PURE__ */ jsxs("span", { className: "span", "data-aos": "zoom-in-left", "data-aos-duration": "700", children: [
        /* @__PURE__ */ jsx("img", { src: span, alt: "" }),
        " Testimonials"
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "text-anime-style-3", children: "Why Our Users Love Us" })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "space60" }),
    /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 12, children: /* @__PURE__ */ jsx(Slider, { ...setting, className: "tes2-slider-all-rtl", "data-aos": "fade-up", "data-aos-duration": "900", children: TestimonialData$1.map((item, idx) => /* @__PURE__ */ jsx("div", { className: "px-1", children: /* @__PURE__ */ jsxs("div", { className: "single-slider", children: [
      /* @__PURE__ */ jsxs("ul", { className: "stars", children: [
        /* @__PURE__ */ jsx("li", { style: { marginRight: "5px" }, children: /* @__PURE__ */ jsx(FaStar, {}) }),
        /* @__PURE__ */ jsx("li", { style: { marginRight: "5px" }, children: /* @__PURE__ */ jsx(FaStar, {}) }),
        /* @__PURE__ */ jsx("li", { style: { marginRight: "5px" }, children: /* @__PURE__ */ jsx(FaStar, {}) }),
        /* @__PURE__ */ jsx("li", { style: { marginRight: "5px" }, children: /* @__PURE__ */ jsx(FaStar, {}) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(FaStar, {}) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "icon", children: /* @__PURE__ */ jsx("img", { src: TestIcon, alt: "" }) }),
      /* @__PURE__ */ jsx("p", { children: item.des }),
      /* @__PURE__ */ jsxs("div", { className: "single-slider-bottom", children: [
        /* @__PURE__ */ jsxs("div", { className: "headdding-area", children: [
          /* @__PURE__ */ jsx("div", { className: "image", children: /* @__PURE__ */ jsx("img", { src: item.image, alt: "" }) }),
          /* @__PURE__ */ jsxs("div", { className: "headding", children: [
            /* @__PURE__ */ jsx("h5", { children: /* @__PURE__ */ jsx(Link, { to: "", children: "Pat Cummins" }) }),
            /* @__PURE__ */ jsx("p", { children: "Ceo Biosynthesis" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "logo", children: /* @__PURE__ */ jsx("img", { src: item.logo, alt: "" }) })
      ] })
    ] }, idx) })) }) }) })
  ] }) }) });
};
const shape1 = "/assets/home2-element1-CK_8zCRb.png";
const shape2 = "/assets/home2-element2-BxDJeDCv.png";
const workImg1 = "/assets/work2-img1-DoaZ9dDX.png";
const workImg2 = "/assets/work2-img2-MK2u3WQG.png";
const workImg3 = "/assets/work2-img3-BPnJo6Yc.png";
const tabContents$2 = [
  { title: "Create Engaging Campaigns", image: workImg1, duration: "800" },
  { title: "Automate Workflows", image: workImg2, duration: "1000" },
  { title: "Grow Your Reach", image: workImg3, duration: "1100" }
];
const Work$2 = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "space100" }),
    /* @__PURE__ */ jsxs("div", { className: "work2 _relative", id: "work", children: [
      /* @__PURE__ */ jsxs(Container, { children: [
        /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 6, className: "m-auto text-center", children: /* @__PURE__ */ jsxs("div", { className: "heading9", children: [
          /* @__PURE__ */ jsxs("span", { className: "span", "data-aos": "zoom-in-left", "data-aos-duration": "700", children: [
            /* @__PURE__ */ jsx("img", { src: span, alt: "" }),
            " Keep track of your employee data"
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-anime-style-3", children: "HRMS Software Will Be Your Organization Data Warehouse" })
        ] }) }) }),
        /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 9, className: "m-auto text-center", children: /* @__PURE__ */ jsx("ul", { className: "nav nav-pills mb-3", id: "pills-tab", role: "tablist", children: [1, 2, 3].map((num) => /* @__PURE__ */ jsx("li", { className: "nav-item", role: "presentation", children: /* @__PURE__ */ jsx(
          "button",
          {
            className: `nav-link${activeTab === `tab${num}` ? " active" : ""}`,
            id: `tab${num}-tab`,
            type: "button",
            role: "tab",
            "aria-controls": `tab${num}`,
            "aria-selected": activeTab === `tab${num}`,
            onClick: () => setActiveTab(`tab${num}`),
            children: num
          }
        ) }, num)) }) }) }),
        /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 12, children: /* @__PURE__ */ jsx(Tab.Container, { activeKey: activeTab, children: /* @__PURE__ */ jsx(Tab.Content, { children: [1, 2, 3].map((tabIndex) => /* @__PURE__ */ jsx(Tab.Pane, { eventKey: `tab${tabIndex}`, id: `tab${tabIndex}`, children: /* @__PURE__ */ jsx(Row, { children: tabContents$2.map((item, i) => /* @__PURE__ */ jsx(Col, { lg: 4, children: /* @__PURE__ */ jsxs("div", { className: "tabs-box-item", "data-aos": "fade-up", "data-aos-duration": item.duration || "800", children: [
          /* @__PURE__ */ jsx("h3", { children: item.title }),
          /* @__PURE__ */ jsx("img", { src: item.image, alt: item.title })
        ] }) }, i)) }) }, tabIndex)) }) }) }) })
      ] }),
      /* @__PURE__ */ jsx("img", { className: "shape1", src: shape1, alt: "shape1" }),
      /* @__PURE__ */ jsx("img", { className: "shape2", src: shape2, alt: "shape2" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space40" })
  ] });
};
const meta$e = () => {
  return [{ title: "Web Page Builder" }];
};
const index$8 = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Hero$7, {}),
    /* @__PURE__ */ jsx(Work$2, {}),
    /* @__PURE__ */ jsx(Counter$2, {}),
    /* @__PURE__ */ jsx(Process$1, {}),
    /* @__PURE__ */ jsx(Benefit$1, {}),
    /* @__PURE__ */ jsx(Solution$1, {}),
    /* @__PURE__ */ jsx(Testimonial$1, {}),
    /* @__PURE__ */ jsx(CTA$2, {}),
    /* @__PURE__ */ jsx(Footer$1, {})
  ] });
};
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$8,
  meta: meta$e
}, Symbol.toStringTag, { value: "Module" }));
const Download = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "download-blog-area sp _relative", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 6, className: "m-auto text-center", children: /* @__PURE__ */ jsxs("div", { className: "headding2", children: [
      /* @__PURE__ */ jsx("span", { className: "span", children: "Apps WebDock Studio" }),
      /* @__PURE__ */ jsx("h2", { children: "Apps for all your devices" })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "space30" }),
    /* @__PURE__ */ jsxs(Row, { children: [
      /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsxs("div", { className: "download-box", children: [
        /* @__PURE__ */ jsx("div", { className: "image" }),
        /* @__PURE__ */ jsxs("div", { className: "headding2", children: [
          /* @__PURE__ */ jsx("span", { className: "span", children: "Mobile" }),
          /* @__PURE__ */ jsx("h5", { children: "Mobile App Version" }),
          /* @__PURE__ */ jsx("div", { className: "space10" }),
          /* @__PURE__ */ jsxs("div", { className: "buttons", children: [
            /* @__PURE__ */ jsx(Link, { to: "" }),
            /* @__PURE__ */ jsx(Link, { to: "" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsxs("div", { className: "download-box", children: [
        /* @__PURE__ */ jsx("div", { className: "image" }),
        /* @__PURE__ */ jsxs("div", { className: "headding2", children: [
          /* @__PURE__ */ jsx("span", { className: "span", children: "Tablet" }),
          /* @__PURE__ */ jsx("h5", { children: "Tablet Version" }),
          /* @__PURE__ */ jsx("div", { className: "space10" }),
          /* @__PURE__ */ jsxs("div", { className: "buttons", children: [
            /* @__PURE__ */ jsx(Link, { to: "" }),
            /* @__PURE__ */ jsx(Link, { to: "" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Col, { lg: 12, children: /* @__PURE__ */ jsx("div", { className: "download-box", children: /* @__PURE__ */ jsxs(Row, { className: "align-items-center bg", children: [
        /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsx("div", { className: "image" }) }),
        /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsxs("div", { className: "headding2", children: [
          /* @__PURE__ */ jsx("span", { className: "span", children: "Desktop WebDock Studio" }),
          /* @__PURE__ */ jsx("h5", { children: "WebDock Studio Desktop Version" }),
          /* @__PURE__ */ jsx("div", { className: "space10" }),
          /* @__PURE__ */ jsxs("div", { className: "buttons", children: [
            /* @__PURE__ */ jsx(Link, { to: "" }),
            /* @__PURE__ */ jsx(Link, { to: "" })
          ] })
        ] }) })
      ] }) }) })
    ] })
  ] }) }) });
};
const Hero$6 = () => {
  useEffect(() => {
    document.body.classList.add("body2", "body");
    return () => {
      document.body.classList.remove("body2", "body");
    };
  }, []);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "pages-hero", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Row, { className: "align-items-center", children: [
    /* @__PURE__ */ jsx(Col, { lg: 7, children: /* @__PURE__ */ jsxs("div", { className: "main-headding", children: [
      /* @__PURE__ */ jsx("h1", { children: "Visit WebDock On Any & Every Device" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Where email marketing meets innovation. Say goodbye to generic ",
        /* @__PURE__ */ jsx("br", {}),
        "campaigns & hello to personalised, high-converting emails resonate with your audience."
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space30" }),
      /* @__PURE__ */ jsxs("div", { className: "hero-btns", children: [
        /* @__PURE__ */ jsx(Link, { to: "/account", className: "theme-btn2", children: "Get Started Now" }),
        /* @__PURE__ */ jsx(Link, { to: "/account", className: "theme-btn3", children: "Try For Free Now" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Col, { lg: 5, children: /* @__PURE__ */ jsx("div", { className: "hero-image" }) })
  ] }) }) }) });
};
const meta$d = () => {
  return [{ title: "Web Page Builder" }];
};
const index$7 = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(MainLayout, { children: [
    /* @__PURE__ */ jsx(Hero$6, {}),
    /* @__PURE__ */ jsx(Download, {})
  ] }) });
};
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$7,
  meta: meta$d
}, Symbol.toStringTag, { value: "Module" }));
const AboutData = [
  {
    image: "1",
    /*Icon1,*/
    title: "Comprehensive Analytics:",
    des: "Gain valuable insights into your email performance. eSoft offers robust analytics and reporting tools"
  },
  {
    image: "2",
    /*Icon2,*/
    title: "Effortless Automation:",
    des: "Gain valuable insights into your email performance. eSoft offers robust analytics and reporting tools"
  },
  {
    image: "3",
    /*Icon3,*/
    title: "Personalised Targeting:",
    des: "Gain valuable insights into your email performance. eSoft offers robust analytics and reporting tools"
  }
];
const About3 = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "about-page-area2 _relative", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 6, className: "m-auto text-center", children: /* @__PURE__ */ jsxs("div", { className: "headding2", children: [
      /* @__PURE__ */ jsx("h2", { children: "Email Excellence Starts Here" }),
      /* @__PURE__ */ jsx("div", { className: "space16" }),
      /* @__PURE__ */ jsx("p", { children: "Revolutionise your approach to email marketing with WebDock Studio. As pioneers the industry, we bring you a WebDock Studio comprehensive solution that only." })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "space30" }),
    /* @__PURE__ */ jsxs(Row, { className: "align-items-center", children: [
      /* @__PURE__ */ jsxs(Col, { lg: 7, children: [
        /* @__PURE__ */ jsx("div", { className: "space30" }),
        /* @__PURE__ */ jsx("div", { className: "left-image" })
      ] }),
      /* @__PURE__ */ jsx(Col, { lg: 5, children: /* @__PURE__ */ jsx("div", { className: "about-page-boxs", children: AboutData.map((item, idx) => /* @__PURE__ */ jsxs("div", { className: "single-box", children: [
        /* @__PURE__ */ jsx("div", { className: "icon" }),
        /* @__PURE__ */ jsx("div", { className: "space20" }),
        /* @__PURE__ */ jsxs("div", { className: "headding2", children: [
          /* @__PURE__ */ jsx("h4", { children: /* @__PURE__ */ jsx(Link, { to: "/features", children: item.title }) }),
          /* @__PURE__ */ jsx("div", { className: "space10" }),
          /* @__PURE__ */ jsx("p", { children: item.des })
        ] })
      ] }, idx)) }) })
    ] })
  ] }) }) });
};
const Innovation = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    "div",
    {
      className: "email-innovation",
      style: {
        //backgroundImage: `url(${bg})`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      },
      children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Row, { children: [
        /* @__PURE__ */ jsx(Col, { lg: 5, children: /* @__PURE__ */ jsxs("div", { className: "headding2-w", children: [
          /* @__PURE__ */ jsx("h2", { children: "Email innovation: Craft marketing an success" }),
          /* @__PURE__ */ jsx("div", { className: "space16" }),
          /* @__PURE__ */ jsx("p", { children: "Email marketing journey transforms into a streamlined, an powerful experience. Our cutting-edge platform eeSofts you with the tools to craft compelling, personalized" }),
          /* @__PURE__ */ jsx("div", { className: "space30" }),
          /* @__PURE__ */ jsx(Link, { to: "/account", className: "theme-btn3", children: "Sign Up For Free" })
        ] }) }),
        /* @__PURE__ */ jsx(Col, { lg: 7, children: /* @__PURE__ */ jsxs("div", { className: "images", children: [
          /* @__PURE__ */ jsx("div", { className: "image1" }),
          /* @__PURE__ */ jsx("div", { className: "image2" }),
          /* @__PURE__ */ jsx("div", { className: "image3" })
        ] }) })
      ] }) })
    }
  ) });
};
const Feature$1 = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "feratures-page-area sp", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsxs(Row, { className: "align-items-center", children: [
      /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsx("div", { className: "image" }) }),
      /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsxs("div", { className: "headding2 features-left", children: [
        /* @__PURE__ */ jsx("span", { className: "span", children: "Email Deliverability" }),
        /* @__PURE__ */ jsx("h5", { children: "Enhance cold email and inbox delivery" }),
        /* @__PURE__ */ jsx("div", { className: "space16" }),
        /* @__PURE__ */ jsx("p", { children: "Experience peace of mind with our deliverability-focused product, real-time notifications, and spam prevention, ensuring your emails consistently land in the right inboxes and sparing you the frustration of spam placement." }),
        /* @__PURE__ */ jsx("div", { className: "space30" }),
        /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(Link, { to: "/account", className: "theme-btn2", children: "Sign Up For Free" }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space100" }),
    /* @__PURE__ */ jsxs(Row, { className: "align-items-center", children: [
      /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsxs("div", { className: "headding2 features-right", children: [
        /* @__PURE__ */ jsx("span", { className: "span", children: "Email Deliverability" }),
        /* @__PURE__ */ jsx("h5", { children: "Target Your Audience" }),
        /* @__PURE__ */ jsx("div", { className: "space16" }),
        /* @__PURE__ */ jsx("p", { children: "Experience peace of mind with our deliverability-focused product, eeSoftped & fail-safes, real-time notifications, and spam prevention, ensuring your emails consistently land in the right inboxes and sparing you the frustration of spam placement." }),
        /* @__PURE__ */ jsx("div", { className: "space30" }),
        /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(Link, { to: "/account", className: "theme-btn2", children: "Sign Up For Free" }) })
      ] }) }),
      /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsx("div", { className: "image" }) })
    ] })
  ] }) }) });
};
const Hero$5 = () => {
  useEffect(() => {
    document.body.classList.add("body2", "body", "unic-body");
    return () => {
      document.body.classList.remove("body2", "body", "unic-body");
    };
  }, []);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "pages-hero", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Row, { className: "align-items-center", children: [
    /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsxs("div", { className: "main-headding", children: [
      /* @__PURE__ */ jsx("h1", { children: "Features WebDock Studio" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Revolutionise & email marketing strategy with cutting-edge ",
        /* @__PURE__ */ jsx("br", {}),
        " software designed to elevate your campaigns, our intuitive."
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space30" }),
      /* @__PURE__ */ jsxs("div", { className: "hero-btns", children: [
        /* @__PURE__ */ jsx(Link, { to: "/account", className: "theme-btn2", children: "Get Started Now" }),
        /* @__PURE__ */ jsx(Link, { to: "/account", className: "theme-btn3", children: "Try For Free Now" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsx("div", { className: "hero-image shape-animaiton3" }) })
  ] }) }) }) });
};
const stikyData = [
  {
    title: "Website Competitor Analysis:",
    description: "Dive into the world of keywords with our powerful research an tools. Identify high-performing keywords relevant to your SEO niche, allowing you to tailor your content strategy and.",
    features: ["Content Optimization Tools", "Regular Performance Monitoring", "Improved Search Engine Rankings"]
  },
  {
    title: "Customised SEO Strategies:",
    description: "Tailor your SEO approach with personalised recommend and strategies based on your website's unique needs. Stay best informed about changes in your website's performance",
    features: ["Content Optimization Tools", "Regular Performance Monitoring", "Improved Search Engine Rankings"]
  },
  {
    title: "Local SEO Enhancement",
    description: "Optimise your online presence for local searches, attracting nearby customers and clients. Stay ahead of industry market changes with regular software updates that incorporate.",
    features: ["Content Optimization Tools", "Regular Performance Monitoring", "Improved Search Engine Rankings"]
  }
];
const Stiky = () => {
  return /* @__PURE__ */ jsx("div", { className: "stiky-sec sp", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 12, children: /* @__PURE__ */ jsx("div", { className: "stiky-sec-boxs _relative", children: stikyData.map((item, index2) => /* @__PURE__ */ jsx("div", { className: "stiky-single", children: /* @__PURE__ */ jsxs(Row, { className: "align-items-center", children: [
    /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsxs("div", { className: "headding", children: [
      /* @__PURE__ */ jsx("h3", { children: item.title }),
      /* @__PURE__ */ jsx("div", { className: "space16" }),
      /* @__PURE__ */ jsx("p", { children: item.description }),
      /* @__PURE__ */ jsx("div", { className: "space20" }),
      /* @__PURE__ */ jsx("ul", { className: "list", children: item.features.map((feature, i) => /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("span", { className: "arrow", children: /* @__PURE__ */ jsx(FaCheck, {}) }),
        feature
      ] }, i)) }),
      /* @__PURE__ */ jsx("div", { className: "space30" }),
      /* @__PURE__ */ jsx(Link, { to: "/features", className: "theme-btn2", children: /* @__PURE__ */ jsx("span", { children: "Unlock SEO Power" }) })
    ] }) }),
    /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsx("div", { className: "stiky-sec-img" }) })
  ] }) }, index2)) }) }) }) }) });
};
const tabContents$1 = [
  {
    title: "Create Engaging Campaigns"
    /*image: workImg1, duration: '800'*/
  },
  {
    title: "Automate Workflows"
    /*image: workImg2, duration: '1000' */
  },
  {
    title: "Grow Your Reach"
    /*image: workImg3, duration: '1100'*/
  }
];
const Work$1 = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "work2 sp _relative", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 6, className: "m-auto text-center", children: /* @__PURE__ */ jsxs("div", { className: "headding2", children: [
      /* @__PURE__ */ jsx("span", { className: "span", children: "How It Works" }),
      /* @__PURE__ */ jsx("h2", { className: "text-anime-style-3", children: "Next-Level Email Strategies" })
    ] }) }) }),
    /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 9, className: "m-auto text-center", children: /* @__PURE__ */ jsx("ul", { className: "nav nav-pills mb-3", id: "pills-tab", role: "tablist", children: [1, 2, 3].map((num) => /* @__PURE__ */ jsx("li", { className: "nav-item", role: "presentation", children: /* @__PURE__ */ jsx(
      "button",
      {
        className: `nav-link${activeTab === `tab${num}` ? " active" : ""}`,
        id: `tab${num}-tab`,
        type: "button",
        role: "tab",
        "aria-controls": `tab${num}`,
        "aria-selected": activeTab === `tab${num}`,
        onClick: () => setActiveTab(`tab${num}`),
        children: num
      }
    ) }, num)) }) }) }),
    /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 12, children: /* @__PURE__ */ jsx(Tab.Container, { activeKey: activeTab, children: /* @__PURE__ */ jsx(Tab.Content, { children: [1, 2, 3].map((tabIndex) => /* @__PURE__ */ jsx(Tab.Pane, { eventKey: `tab${tabIndex}`, id: `tab${tabIndex}`, children: /* @__PURE__ */ jsx(Row, { children: tabContents$1.map((item, i) => /* @__PURE__ */ jsx(Col, { lg: 4, children: /* @__PURE__ */ jsx("div", { className: "tabs-box-item", "data-aos": "fade-up", "data-aos-duration": item.duration || "800", children: /* @__PURE__ */ jsx("h3", { children: item.title }) }) }, i)) }) }, tabIndex)) }) }) }) })
  ] }) }) });
};
const meta$c = () => {
  return [{ title: "Web Page Builder" }];
};
const index$6 = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(MainLayout, { children: /* @__PURE__ */ jsxs("div", { className: "unic-body", children: [
    /* @__PURE__ */ jsx(Hero$5, {}),
    /* @__PURE__ */ jsx(Stiky, {}),
    /* @__PURE__ */ jsx(Work$1, {}),
    /* @__PURE__ */ jsx(Innovation, {}),
    /* @__PURE__ */ jsx(Feature$1, {}),
    /* @__PURE__ */ jsx(About3, {})
  ] }) }) });
};
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$6,
  meta: meta$c
}, Symbol.toStringTag, { value: "Module" }));
const Account = () => {
  useEffect(() => {
    document.body.classList.add("body2", "body");
    return () => {
      document.body.classList.remove("body2", "body");
    };
  }, []);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "log-in-area sp _relative", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 6, className: "m-auto text-center", children: /* @__PURE__ */ jsx("div", { className: "main-logo", children: /* @__PURE__ */ jsx(Link, { to: "/home-1" }) }) }) }),
    /* @__PURE__ */ jsx("div", { className: "space80" }),
    /* @__PURE__ */ jsxs(Row, { className: "align-items-center", children: [
      /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsxs("div", { className: "login-form", children: [
        /* @__PURE__ */ jsxs("div", { className: "headding", children: [
          /* @__PURE__ */ jsx("h2", { children: "Create Account" }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Already have an account with us? ",
            /* @__PURE__ */ jsx(Link, { to: "login", children: "Log in" })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Form, { className: "inputs", children: /* @__PURE__ */ jsxs(Row, { children: [
          /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsxs("div", { className: "single-inputs", children: [
            /* @__PURE__ */ jsx(Form.Label, { children: "Name" }),
            /* @__PURE__ */ jsx(Form.Control, { type: "text", placeholder: "Full name" })
          ] }) }),
          /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsxs("div", { className: "single-inputs", children: [
            /* @__PURE__ */ jsx(Form.Label, { children: "Email Address" }),
            /* @__PURE__ */ jsx(Form.Control, { type: "email", placeholder: "Enter your email" })
          ] }) }),
          /* @__PURE__ */ jsx(Col, { lg: 12, children: /* @__PURE__ */ jsxs("div", { className: "single-inputs", children: [
            /* @__PURE__ */ jsx(Form.Label, { children: "Password" }),
            /* @__PURE__ */ jsx(Form.Control, { type: "password", placeholder: "Enter your password" })
          ] }) }),
          /* @__PURE__ */ jsx(Col, { lg: 12, children: /* @__PURE__ */ jsx("div", { className: "button", children: /* @__PURE__ */ jsx(Button, { className: "theme-btn2", children: "Log In" }) }) })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "forgot-text", children: /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("input", { type: "radio", id: "redio" }),
          /* @__PURE__ */ jsx("label", { htmlFor: "redio", children: " Don’t have an account? " }),
          /* @__PURE__ */ jsx(Link, { className: "singup", to: "#", children: "Terms & Conditions" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "brand-buttons", children: [
          /* @__PURE__ */ jsx(Link, { to: "#" }),
          /* @__PURE__ */ jsx(Link, { to: "#", children: " Sign in with Apple" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsx("div", { className: "login-img" }) })
    ] })
  ] }) }) });
};
const meta$b = () => {
  return [{ title: "Web Page Builder" }];
};
const index$5 = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Account, {}) });
};
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$5,
  meta: meta$b
}, Symbol.toStringTag, { value: "Module" }));
const Contact = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "space60" }),
    /* @__PURE__ */ jsx("div", { className: "contact-page-area sp", children: /* @__PURE__ */ jsxs(Container, { children: [
      /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 8, className: "m-auto text-center", children: /* @__PURE__ */ jsxs("div", { className: "common-main-headding", children: [
        /* @__PURE__ */ jsx("h1", { children: "Customer Support" }),
        /* @__PURE__ */ jsx("p", { children: "At Webdock studio, we value your inquiries and are here to provide the support you need. Whether you're looking for more information about our cutting-edge software." })
      ] }) }) }),
      /* @__PURE__ */ jsx("div", { className: "space60" }),
      /* @__PURE__ */ jsx("div", { className: "contact-form-all", children: /* @__PURE__ */ jsxs(Row, { className: "align-items-center", children: [
        /* @__PURE__ */ jsx(Col, { lg: 7, children: /* @__PURE__ */ jsxs("div", { className: "form-inputs", children: [
          /* @__PURE__ */ jsx("h5", { children: "Send us a Message" }),
          /* @__PURE__ */ jsx("div", { className: "space16" }),
          /* @__PURE__ */ jsx("p", { children: "As a fellow small business owner, we know the fulfillment that an a comes from running your own business contact to Financy." }),
          /* @__PURE__ */ jsx("div", { className: "space30" }),
          /* @__PURE__ */ jsx("form", { action: "#", children: /* @__PURE__ */ jsxs(Row, { children: [
            /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsx("div", { className: "input", children: /* @__PURE__ */ jsx("input", { type: "text", placeholder: "First Name*" }) }) }),
            /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsx("div", { className: "input", children: /* @__PURE__ */ jsx("input", { type: "email", placeholder: "Email*" }) }) }),
            /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsx("div", { className: "input", children: /* @__PURE__ */ jsx("input", { type: "number", placeholder: "Phone*" }) }) }),
            /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsx("div", { className: "input", children: /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Website*" }) }) }),
            /* @__PURE__ */ jsxs(Col, { lg: 12, children: [
              /* @__PURE__ */ jsx("div", { className: "input", children: /* @__PURE__ */ jsx("textarea", { cols: 30, rows: 3, placeholder: "Your Message*" }) }),
              /* @__PURE__ */ jsx("div", { className: "button", children: /* @__PURE__ */ jsx("button", { type: "submit", className: "theme-btn2", children: "Submit Now" }) })
            ] })
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsx(Col, { lg: 5, children: /* @__PURE__ */ jsxs("div", { className: "contact-page-boxs", children: [
          /* @__PURE__ */ jsxs("div", { className: "single-box", children: [
            /* @__PURE__ */ jsx("div", { className: "icon" }),
            /* @__PURE__ */ jsxs("div", { className: "headding", children: [
              /* @__PURE__ */ jsx("h5", { children: "Call" }),
              /* @__PURE__ */ jsx(Link, { to: "tel:+91 9325222397", children: "+91 9325222397" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "single-box", children: [
            /* @__PURE__ */ jsx("div", { className: "icon" }),
            /* @__PURE__ */ jsxs("div", { className: "headding", children: [
              /* @__PURE__ */ jsx("h5", { children: "Email" }),
              /* @__PURE__ */ jsx(Link, { to: "mailto:webdockstudios@gmail.com", children: "webdockstudios@gmail.com" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "single-box", children: [
            /* @__PURE__ */ jsx("div", { className: "icon" }),
            /* @__PURE__ */ jsxs("div", { className: "headding", children: [
              /* @__PURE__ */ jsx("h5", { children: "Schedule Time" }),
              /* @__PURE__ */ jsx(Link, { to: "", children: "Mon - Fri: 10am to 5pm" })
            ] })
          ] })
        ] }) })
      ] }) })
    ] }) })
  ] });
};
const meta$a = () => {
  return [{ title: "Web Page Builder" }];
};
const page$1 = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(MainLayout, { children: /* @__PURE__ */ jsx(Contact, {}) }) });
};
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: page$1,
  meta: meta$a
}, Symbol.toStringTag, { value: "Module" }));
const Hero$4 = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "pages-hero", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Row, { className: "align-items-center", children: [
    /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsxs("div", { className: "main-headding", children: [
      /* @__PURE__ */ jsx("h1", { children: "Pricing Plan" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Revolutionise & email marketing strategy with cutting-edge ",
        /* @__PURE__ */ jsx("br", {}),
        " software designed to elevate your campaigns, our intuitive."
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space30" }),
      /* @__PURE__ */ jsxs("div", { className: "hero-btns", children: [
        /* @__PURE__ */ jsx(Link, { to: "/account", className: "theme-btn2", children: "Get Started Now" }),
        /* @__PURE__ */ jsx(Link, { to: "/account", className: "theme-btn3", children: "Try For Free Now" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsx("div", { className: "hero-image shape-animaiton3" }) })
  ] }) }) }) });
};
const pricingData = {
  monthly: [
    {
      label: "Free Forever",
      name: "Free",
      duration: "Unlimited Month",
      button: "Free Forever",
      features: [
        "Unlimited Storage",
        "Unlimited Integrations",
        "Guests with Permissions",
        "Unlimited Custom Fields",
        "Resource Management",
        "Advanced Public Sharing",
        "Advanced Time Tracking",
        "Workload Management",
        "Conditional Logic in Forms",
        "Access to Managed Services",
        "Team Sharing for Spaces"
      ]
    },
    {
      label: "Mid Teams",
      name: "Business",
      duration: "Unlimited Month",
      button: "Free Forever",
      features: [
        "Unlimited Storage",
        "Unlimited Integrations",
        "Guests with Permissions",
        "Unlimited Custom Fields",
        "Resource Management",
        "Advanced Public Sharing",
        "Advanced Time Tracking",
        "Workload Management",
        "Conditional Logic in Forms",
        "Access to Managed Services",
        "Team Sharing for Spaces"
      ]
    },
    {
      label: "Large Teams",
      name: "Enterprise",
      duration: "Unlimited Usages",
      button: "Free Forever",
      features: [
        "Unlimited Storage",
        "Unlimited Integrations",
        "Guests with Permissions",
        "Unlimited Custom Fields",
        "Resource Management",
        "Advanced Public Sharing",
        "Advanced Time Tracking",
        "Workload Management",
        "Conditional Logic in Forms",
        "Access to Managed Services",
        "Team Sharing for Spaces"
      ]
    }
  ],
  yearly: [
    {
      label: "Free Forever",
      name: "Free",
      duration: "Unlimited Yearly",
      button: "Free Forever",
      features: [
        "Unlimited Storage",
        "Unlimited Integrations",
        "Guests with Permissions",
        "Unlimited Custom Fields",
        "Resource Management",
        "Advanced Public Sharing",
        "Advanced Time Tracking",
        "Workload Management",
        "Conditional Logic in Forms",
        "Access to Managed Services",
        "Team Sharing for Spaces"
      ]
    },
    {
      label: "Mid Teams",
      name: "Business",
      duration: "Unlimited Yearly",
      button: "Free Forever",
      features: [
        "Unlimited Storage",
        "Unlimited Integrations",
        "Guests with Permissions",
        "Unlimited Custom Fields",
        "Resource Management",
        "Advanced Public Sharing",
        "Advanced Time Tracking",
        "Workload Management",
        "Conditional Logic in Forms",
        "Access to Managed Services",
        "Team Sharing for Spaces"
      ]
    },
    {
      label: "Large Teams",
      name: "Enterprise",
      duration: "Unlimited Usages",
      button: "Free Forever",
      features: [
        "Unlimited Storage",
        "Unlimited Integrations",
        "Guests with Permissions",
        "Unlimited Custom Fields",
        "Resource Management",
        "Advanced Public Sharing",
        "Advanced Time Tracking",
        "Workload Management",
        "Conditional Logic in Forms",
        "Access to Managed Services",
        "Team Sharing for Spaces"
      ]
    }
  ]
};
const Pricing = () => {
  const [isYearly, setIsYearly] = useState(true);
  const plans = isYearly ? pricingData.monthly : pricingData.yearly;
  return /* @__PURE__ */ jsx("div", { className: "pricing-plan-page sp", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx("div", { className: "princing-plans", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { xs: 12, className: "text-center", children: /* @__PURE__ */ jsxs("div", { className: "plan-toggle-wrap", children: [
      /* @__PURE__ */ jsx("p", { className: "pera", children: "Save up to 32% with yearly billing." }),
      /* @__PURE__ */ jsxs("div", { className: `toggle-inner toggle-inner2 ${isYearly ? "active" : ""}`, onClick: () => setIsYearly(!isYearly), children: [
        /* @__PURE__ */ jsx("input", { id: "ce-toggle", type: "checkbox", checked: isYearly, readOnly: true }),
        /* @__PURE__ */ jsx("span", { className: "custom-toggle" }),
        /* @__PURE__ */ jsx("span", { className: `t-month ${isYearly ? "toggle-inactive" : "toggle-active"}`, children: "Monthly" }),
        /* @__PURE__ */ jsx("span", { className: `t-year ${isYearly ? "toggle-active" : "toggle-inactive"}`, children: "Yearly (Save 20%)" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "space60" }),
    /* @__PURE__ */ jsx(Row, { children: plans.map((plan, index2) => /* @__PURE__ */ jsx(Col, { md: 6, lg: 4, children: /* @__PURE__ */ jsx("div", { className: "pricing-box h-100", children: /* @__PURE__ */ jsxs("div", { className: "pricing-box-single d-flex flex-column h-100", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-3", children: [
        /* @__PURE__ */ jsx("span", { className: "span", children: plan.label }),
        /* @__PURE__ */ jsx("h3", { children: plan.name }),
        /* @__PURE__ */ jsx("p", { className: "pera", children: plan.duration })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-center mb-3", children: /* @__PURE__ */ jsx(Link, { to: "", className: "theme-btn2", children: plan.button }) }),
      /* @__PURE__ */ jsx("ul", { className: "list flex-grow-1", children: plan.features.map((feature, i) => /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaCheck, {}) }),
        feature
      ] }, i)) })
    ] }) }) }, index2)) })
  ] }) }) }) });
};
const meta$9 = () => {
  return [{ title: "Web Page Builder" }];
};
const index$4 = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(MainLayout, { children: [
    /* @__PURE__ */ jsx(Hero$4, {}),
    /* @__PURE__ */ jsx(Pricing, {})
  ] }) });
};
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$4,
  meta: meta$9
}, Symbol.toStringTag, { value: "Module" }));
const Forgot = () => {
  useEffect(() => {
    document.body.classList.add("body2", "body");
    return () => {
      document.body.classList.remove("body2", "body");
    };
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "log-in-area forgot-area _relative", children: /* @__PURE__ */ jsxs(Container, { children: [
      /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 6, className: "m-auto text-center", children: /* @__PURE__ */ jsx("div", { className: "main-logo", children: /* @__PURE__ */ jsx(Link, { to: "/home-1" }) }) }) }),
      /* @__PURE__ */ jsx("div", { className: "space80" }),
      /* @__PURE__ */ jsx(Row, { className: "align-items-center", children: /* @__PURE__ */ jsx(Col, { lg: 6, className: "m-auto", children: /* @__PURE__ */ jsxs("div", { className: "login-form", children: [
        /* @__PURE__ */ jsxs("div", { className: "headding", children: [
          /* @__PURE__ */ jsx("h2", { children: "Forgot Password?" }),
          /* @__PURE__ */ jsx("p", { children: "If you forgot your password, please enter your email below and we will send you a recovery link." })
        ] }),
        /* @__PURE__ */ jsxs(Form, { action: "", className: "inputs", children: [
          /* @__PURE__ */ jsxs("div", { className: "single-inputs", children: [
            /* @__PURE__ */ jsx(Form.Label, { children: "Email Address" }),
            /* @__PURE__ */ jsx(Form.Control, { type: "text", placeholder: "Enter your email" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "button", children: /* @__PURE__ */ jsx(Button, { className: "theme-btn2", children: "Send Recovery Link" }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "forgot-text", children: /* @__PURE__ */ jsxs("p", { children: [
          "Remember your password",
          /* @__PURE__ */ jsx(Link, { className: "singup", to: "/login", children: "Log In" })
        ] }) })
      ] }) }) })
    ] }) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "bg-area-all",
        style: {
          //backgroundImage: `url(${forgotBg})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "390px"
        }
      }
    )
  ] });
};
const meta$8 = () => {
  return [{ title: "Web Page Builder" }];
};
const index$3 = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Forgot, {}) });
};
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$3,
  meta: meta$8
}, Symbol.toStringTag, { value: "Module" }));
const BasicLayout = ({ children }) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Loader, {}), children }) });
};
const Brands$1 = () => {
  return /* @__PURE__ */ jsx("div", { className: "brands-area6 sp", id: "brands", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Row, { className: "align-items-center", children: [
    /* @__PURE__ */ jsx(Col, { lg: 5, children: /* @__PURE__ */ jsxs("div", { className: "heading6-w", children: [
      /* @__PURE__ */ jsx("span", { className: "span2", "data-aos": "fade-left", "data-aos-duration": "700", children: "Integration brands" }),
      /* @__PURE__ */ jsx("h2", { className: "text-anime-style-3", children: "Integrate Your eSoft Builder With 3K App" }),
      /* @__PURE__ */ jsx("div", { className: "space16" }),
      /* @__PURE__ */ jsx("p", { "data-aos": "fade-left", "data-aos-duration": "900", children: "Seamlessly integrate your WebDock Studio Websites with the 3K App to elevate your workflow and enhance productivity. By combining the powerful design capabilities of WeebDock Studio Websites with the robust features of the 3K Apps." }),
      /* @__PURE__ */ jsx("div", { className: "space30" }),
      /* @__PURE__ */ jsx("div", { className: "", "data-aos": "fade-left", "data-aos-duration": "1000", children: /* @__PURE__ */ jsx(Link, { to: "/account", className: "theme-btn8", children: /* @__PURE__ */ jsxs("span", { className: "tb8", children: [
        "Get Started, It’s Free",
        /* @__PURE__ */ jsx("span", { className: "arrow", children: /* @__PURE__ */ jsx(FaArrowRight, {}) })
      ] }) }) })
    ] }) }),
    /* @__PURE__ */ jsx(Col, { lg: 1 }),
    /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsxs("div", { className: "apps-images", children: [
      /* @__PURE__ */ jsx("div", { className: "image1", children: /* @__PURE__ */ jsx("div", { className: "dot" }) }),
      /* @__PURE__ */ jsx("div", { className: "image2" })
    ] }) })
  ] }) }) });
};
const Counter$1 = () => {
  const [CountUp, setCountUp] = useState(null);
  useEffect(() => {
    import("react-countup").then((mod) => {
      setCountUp(() => mod.default);
    });
  }, []);
  if (!CountUp) return null;
  return /* @__PURE__ */ jsx("div", { className: "counters6 sp", id: "counters", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 12, className: "m-auto text-center", children: /* @__PURE__ */ jsx("div", { className: "heading6", children: /* @__PURE__ */ jsx("h3", { className: "text-anime-style-3", children: "Trusted by Top Choice For Websites Worldwide" }) }) }) }),
    /* @__PURE__ */ jsx("div", { className: "space30" }),
    /* @__PURE__ */ jsxs(Row, { children: [
      /* @__PURE__ */ jsx(Col, { lg: 3, xs: 6, children: /* @__PURE__ */ jsxs("div", { className: "counter-box box1", "data-aos": "zoom-out", "data-aos-duration": "700", children: [
        /* @__PURE__ */ jsx("h2", { children: /* @__PURE__ */ jsx("span", { className: "counter", children: /* @__PURE__ */ jsx(CountUp, { start: 0, duration: 10, end: 16, suffix: " M+" }) }) }),
        /* @__PURE__ */ jsx("p", { children: "Built With Elementor" })
      ] }) }),
      /* @__PURE__ */ jsx(Col, { lg: 3, xs: 6, children: /* @__PURE__ */ jsxs("div", { className: "counter-box box2", "data-aos": "zoom-out", "data-aos-duration": "900", children: [
        /* @__PURE__ */ jsx("h2", { children: /* @__PURE__ */ jsx("span", { className: "counter", children: /* @__PURE__ */ jsx(CountUp, { start: 0, duration: 5, end: 6.5, decimals: 1, suffix: " K+" }) }) }),
        /* @__PURE__ */ jsx("p", { children: "5 Star Reviews" })
      ] }) }),
      /* @__PURE__ */ jsx(Col, { lg: 3, xs: 6, children: /* @__PURE__ */ jsxs("div", { className: "counter-box box3", "data-aos": "zoom-out", "data-aos-duration": "1100", children: [
        /* @__PURE__ */ jsx("h2", { children: /* @__PURE__ */ jsx("span", { className: "counter", children: /* @__PURE__ */ jsx(CountUp, { start: 0, duration: 10, end: 100, suffix: "+" }) }) }),
        /* @__PURE__ */ jsx("p", { children: "5 Star Reviews" })
      ] }) }),
      /* @__PURE__ */ jsx(Col, { lg: 3, xs: 6, children: /* @__PURE__ */ jsxs("div", { className: "counter-box box4", "data-aos": "zoom-out", "data-aos-duration": "1200", children: [
        /* @__PURE__ */ jsx("h2", { children: /* @__PURE__ */ jsx("span", { className: "counter", children: /* @__PURE__ */ jsx(CountUp, { start: 0, duration: 10, end: 16, suffix: "Sec." }) }) }),
        /* @__PURE__ */ jsx("p", { children: "15 Second An Elementor" })
      ] }) })
    ] })
  ] }) });
};
const CTA$1 = () => {
  return /* @__PURE__ */ jsx("div", { className: "cta6", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Row, { className: "align-items-center", children: [
    /* @__PURE__ */ jsx(Col, { lg: 5, children: /* @__PURE__ */ jsxs("div", { className: "heading6-w", children: [
      /* @__PURE__ */ jsx("span", { className: "span", children: "Integration brands" }),
      /* @__PURE__ */ jsxs("h2", { children: [
        "Access A Library Of ",
        /* @__PURE__ */ jsx("br", {}),
        " Pre-Built Templates"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space16" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Seamlessly integrate your Website with WebDock Studio with the 3K App ",
        /* @__PURE__ */ jsx("br", {}),
        " to elevate your workflow and enhance of productivity."
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space30" }),
      /* @__PURE__ */ jsx(Link, { to: "/account", className: "theme-btn8", children: /* @__PURE__ */ jsxs("span", { className: "tb8", children: [
        "Get Started, It’s Free",
        /* @__PURE__ */ jsx("span", { className: "arrow", children: /* @__PURE__ */ jsx(FaArrowRight, {}) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(Col, { lg: 1 }),
    /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsxs("div", { className: "cta6-images", children: [
      /* @__PURE__ */ jsx("div", { className: "image1" }),
      /* @__PURE__ */ jsx("div", { className: "image2" })
    ] }) })
  ] }) }) });
};
const EditingData = [
  {
    Duration: 600,
    image: "1",
    //editing6Icon1,
    title: "Drag & Drop Editing",
    des: 'Drag a "Text Editor" widget from the sidebar and drop it into the desired section or column on your page.'
  },
  {
    Duration: 900,
    image: "2",
    //editing6Icon2,
    title: "True Visual Editing",
    des: "Design your page in real time and see the results instantly. Create an customize your all landing pages."
  },
  {
    Duration: 1100,
    image: "3",
    //editing6Icon3,
    title: "Custom CSS Control",
    des: "Developers can easily combine Divi's visual design controls with their own custom CSS, WebDock Studio interface is best."
  },
  {
    Duration: 700,
    image: "4",
    //editing6Icon4,
    title: "Responsive Editing",
    des: "WebDock Studio Building beautiful responsive websites is easy. Divi is responsive by nature & also gives full control."
  },
  {
    Duration: 1100,
    image: "5",
    //editing6Icon5,
    title: "Copy/Paste Design",
    des: "WebDock Studio Save and manage unlimited custom designs. Easily re-use them to jump-start new home pages."
  },
  {
    Duration: 800,
    image: "6",
    //editing6Icon6,
    title: "Global Element Styles",
    des: "Manage your entire website's design using global elements and website-wide design settings."
  }
];
const Editing = () => {
  return /* @__PURE__ */ jsx("div", { className: "editing6 sp", id: "editing", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 6, className: "m-auto text-center", children: /* @__PURE__ */ jsxs("div", { className: "heading6", children: [
      /* @__PURE__ */ jsx("span", { className: "title" }),
      /* @__PURE__ */ jsx("h2", { className: "text-anime-style-3", children: "Powerful Visual Editing For Your Entire Website" })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "space30" }),
    /* @__PURE__ */ jsx(Row, { children: EditingData.map((item, idx) => /* @__PURE__ */ jsx(Col, { lg: 4, md: 6, "data-aos": "zoom-in-up", "data-aos-duration": item.Duration, children: /* @__PURE__ */ jsxs("div", { className: "editing-box", children: [
      /* @__PURE__ */ jsx("div", { className: "icon" }),
      /* @__PURE__ */ jsx("div", { className: "space16" }),
      /* @__PURE__ */ jsxs("div", { className: "heading6", children: [
        /* @__PURE__ */ jsx("h4", { children: /* @__PURE__ */ jsx(Link, { to: "/features", children: item.title }) }),
        /* @__PURE__ */ jsx("div", { className: "space16" }),
        /* @__PURE__ */ jsx("p", { children: item.des })
      ] })
    ] }) }, idx)) })
  ] }) });
};
const faqData = [
  {
    question: "What is blockchain technology",
    answer: "It's very simple! Register here. In your personal account, create wallet where you can store your FOX tokens. Then just send any amount to the displayed address in your office."
  },
  {
    question: "What is the value of FOX tokens?",
    answer: "It's very simple! Register here. In your personal account, create wallet where you can store your FOX tokens. Then just send any amount to the displayed address in your office."
  },
  {
    question: "I use cryptocurrency participate in the ICO?",
    answer: "It's very simple! Register here. In your personal account, create wallet where you can store your FOX tokens. Then just send any amount to the displayed address in your office."
  },
  {
    question: "What Is Cryptocurrency?",
    answer: "It's very simple! Register here. In your personal account, create wallet where you can store your FOX tokens. Then just send any amount to the displayed address in your office."
  },
  {
    question: "How does cryptocurrency work?",
    answer: "It's very simple! Register here. In your personal account, create wallet where you can store your FOX tokens. Then just send any amount to the displayed address in your office."
  }
];
const Faq = () => {
  const [activeKey, setActiveKey] = useState("0");
  const handleToggle = (key) => {
    setActiveKey((prev) => prev === key ? "" : key);
  };
  return /* @__PURE__ */ jsx("div", { className: "faq6 sp", id: "faq", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsxs(Col, { lg: 10, className: "m-auto text-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "heading6", children: [
      /* @__PURE__ */ jsx("span", { className: "span", children: "FAQ Question" }),
      /* @__PURE__ */ jsx("h2", { className: "text-anime-style-3", children: "Frequently Asked Questions" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space40" }),
    /* @__PURE__ */ jsx("div", { className: "accordion accordion1", id: "accordionExample", children: /* @__PURE__ */ jsx(Accordion, { activeKey, children: faqData.map((item, index2) => {
      const key = index2.toString();
      const isActive = activeKey === key;
      return /* @__PURE__ */ jsxs("div", { className: `accordion-item ${isActive ? "active" : ""}`, onClick: () => handleToggle(key), children: [
        /* @__PURE__ */ jsx("h2", { className: "accordion-header", id: `heading${key}`, children: /* @__PURE__ */ jsx(Accordion.Button, { as: "button", className: `accordion-button ${!isActive ? "collapsed" : ""}`, children: item.question }) }),
        /* @__PURE__ */ jsx(Accordion.Collapse, { eventKey: key, children: /* @__PURE__ */ jsx(
          "div",
          {
            id: `collapse${key}`,
            className: `accordion-collapse collapse ${isActive ? "show" : ""}`,
            "aria-labelledby": `heading${key}`,
            children: /* @__PURE__ */ jsx("div", { className: "accordion-body", children: item.answer })
          }
        ) })
      ] }, key);
    }) }) })
  ] }) }) }) });
};
const featuresData = [
  {
    id: 1,
    subtitle: "Page Builder",
    title: "Front/Back End Page Builder",
    description: "Build a responsive website and manage your content easily with intuitive WordPress Front end editor. No programming knowledge required – create stunning and beautiful pages with award-winning drag and drop builder.",
    //image: features6Img1,
    animation: "fade-left",
    startDelay: 800,
    duration: 700,
    descriptionDelay: 900,
    exitDelay: 900
  },
  {
    id: 2,
    subtitle: "Any Color Choose",
    title: "Roll Your Own Colour Theme",
    description: "Built-in Skin Builder: Use the built-in skin builder to tweak WebDock Studio Page Builder design options and elements styling, making a perfect match with your brand identity.",
    //image: features6Img2,
    animation: "fade-right",
    startDelay: 700,
    duration: 900,
    descriptionDelay: 1100,
    exitDelay: 1e3
  },
  {
    id: 3,
    subtitle: "Any Theme Design",
    title: "For Any WordPress Theme",
    description: "Every website design needs to be unique. With WPBakery Page Builder, you can work with any WordPress theme of your choice. This powerful tool allows you to create responsive an stunning layouts without any coding knowledge.",
    //image: features6Img3,
    animation: "fade-left",
    startDelay: 1e3,
    duration: 700,
    descriptionDelay: 900,
    exitDelay: 1e3
  },
  {
    id: 4,
    subtitle: "Template Library",
    title: "WebDock Studio Template Library",
    description: "Access premium class templates via the online Template Library and build your pages in seconds. Download any template you like without any restrictions. Template Library gets constantly updated with new templates.",
    //image: features6Img4,
    animation: "fade-right",
    startDelay: 700,
    duration: 900,
    descriptionDelay: 1e3,
    exitDelay: 800
  },
  {
    id: 5,
    subtitle: "any layout available",
    title: "Any Mobile/Laptop Layouts",
    description: "WPBakery Page Builder ensures your website looks perfect on every device, whether it’s a mobile phone, tablet, laptop. The responsive design capabilities allow you create layouts.",
    //image: features6Img5,
    animation: "fade-left",
    startDelay: 1e3,
    duration: 700,
    descriptionDelay: 900,
    exitDelay: 1e3
  }
];
const Feature = () => {
  return /* @__PURE__ */ jsx("div", { className: "features6 sp", id: "feature", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 6, className: "m-auto text-center", children: /* @__PURE__ */ jsxs("div", { className: "heading6", children: [
      /* @__PURE__ */ jsx("span", { className: "title" }),
      /* @__PURE__ */ jsx("h2", { className: "text-anime-style-3", children: "WebDocks Studio Features" })
    ] }) }) }),
    featuresData.map((item, index2) => /* @__PURE__ */ jsx(Row, { className: "align-items-center", children: index2 % 2 === 0 ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsx("div", { className: "main-image right60", "data-aos": "zoom-out", "data-aos-duration": item.startDelay }) }),
      /* @__PURE__ */ jsx(Col, { xs: 1 }),
      /* @__PURE__ */ jsx(Col, { lg: 5, children: /* @__PURE__ */ jsxs("div", { className: "heading6 features-heading", children: [
        /* @__PURE__ */ jsx("span", { className: "span3", "data-aos": item.animation, "data-aos-duration": item.duration, children: item.subtitle }),
        /* @__PURE__ */ jsx("h3", { className: "text-anime-style-3", children: item.title }),
        /* @__PURE__ */ jsx("div", { className: "space16" }),
        /* @__PURE__ */ jsx("p", { "data-aos": item.animation, "data-aos-duration": item.descriptionDelay, children: item.description }),
        /* @__PURE__ */ jsx("div", { className: "space30" }),
        /* @__PURE__ */ jsx("div", { "data-aos": item.animation, "data-aos-duration": item.exitDelay, children: /* @__PURE__ */ jsx(Link, { to: "/features", className: "theme-btn9", children: /* @__PURE__ */ jsxs("span", { className: "tb8", children: [
          "Get More Info",
          /* @__PURE__ */ jsx("span", { className: "arrow", children: /* @__PURE__ */ jsx(FaArrowRight, {}) })
        ] }) }) })
      ] }) })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Col, { lg: 5, children: /* @__PURE__ */ jsxs("div", { className: "heading6 features-heading", children: [
        /* @__PURE__ */ jsx("span", { className: "span3", "data-aos": item.animation, "data-aos-duration": item.startDelay, children: item.subtitle }),
        /* @__PURE__ */ jsx("h3", { className: "text-anime-style-3", children: item.title }),
        /* @__PURE__ */ jsx("div", { className: "space16" }),
        /* @__PURE__ */ jsx("p", { "data-aos": item.animation, "data-aos-duration": item.duration, children: item.description }),
        /* @__PURE__ */ jsx("div", { className: "space30" }),
        /* @__PURE__ */ jsx("div", { "data-aos": item.animation, "data-aos-duration": item.descriptionDelay, children: /* @__PURE__ */ jsx(Link, { to: "/features", className: "theme-btn9", children: /* @__PURE__ */ jsxs("span", { className: "tb8", children: [
          "Get More Info",
          /* @__PURE__ */ jsx("span", { className: "arrow", children: /* @__PURE__ */ jsx(FaArrowRight, {}) })
        ] }) }) })
      ] }) }),
      /* @__PURE__ */ jsx(Col, { xs: 1 }),
      /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsx("div", { className: "main-image right60", "data-aos": "zoom-out", "data-aos-duration": item.exitDelay }) })
    ] }) }, item.id))
  ] }) });
};
const FooterLogo = "data:image/png;base64,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";
const menuData = [
  { name: "Community" },
  { name: "Affiliates" },
  { name: "Partnerships" },
  { name: "Perks & Benefits" },
  { name: "Api docs" }
];
const ListData = [{ name: "iPhone & iPad" }, { name: "Android" }, { name: "MacOS" }, { name: "Window" }];
const Footer = () => {
  return /* @__PURE__ */ jsx("div", { className: "footer6 _relative", children: /* @__PURE__ */ jsxs(Container, { className: "bg", children: [
    /* @__PURE__ */ jsxs(Row, { children: [
      /* @__PURE__ */ jsx(Col, { lg: 5, children: /* @__PURE__ */ jsxs("div", { className: "subscribe-area", children: [
        /* @__PURE__ */ jsx("h5", { children: "Subscribe to our newsletter" }),
        /* @__PURE__ */ jsx("p", { children: "WebDock Studio has exceeded our expectations every way. The ease with & which Search Engine" }),
        /* @__PURE__ */ jsxs("div", { className: "input-area", children: [
          /* @__PURE__ */ jsx("input", { type: "email", placeholder: "Email Address" }),
          /* @__PURE__ */ jsx("div", { className: "button", children: /* @__PURE__ */ jsx("button", { className: "theme-btn9", children: /* @__PURE__ */ jsxs("span", { className: "tb8", children: [
            "Get Started Now",
            /* @__PURE__ */ jsx("span", { className: "arrow", children: /* @__PURE__ */ jsx(FaArrowRight, {}) })
          ] }) }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Col, { lg: true, md: 6, xs: 6, children: /* @__PURE__ */ jsxs("div", { className: "single-footer-items", children: [
        /* @__PURE__ */ jsx("h3", { children: "Resources" }),
        /* @__PURE__ */ jsx("ul", { className: "menu-list", children: menuData.map((item, idx) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "", children: item.name }) }, idx)) })
      ] }) }),
      /* @__PURE__ */ jsx(Col, { lg: true, md: 6, xs: 6, children: /* @__PURE__ */ jsxs("div", { className: "single-footer-items", children: [
        /* @__PURE__ */ jsx("h3", { children: "Download" }),
        /* @__PURE__ */ jsx("ul", { className: "menu-list", children: ListData.map((item, idx) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "", children: item.name }) }, idx)) })
      ] }) }),
      /* @__PURE__ */ jsx(Col, { lg: 3, md: 6, xs: 12, children: /* @__PURE__ */ jsxs("div", { className: "single-footer-items", children: [
        /* @__PURE__ */ jsx("h3", { children: "Social Links" }),
        /* @__PURE__ */ jsxs("ul", { className: "social-icons", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "", children: /* @__PURE__ */ jsx(FaLinkedinIn, {}) }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "", children: /* @__PURE__ */ jsx(FaXTwitter, {}) }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "", children: /* @__PURE__ */ jsx(FaYoutube, {}) }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "", children: /* @__PURE__ */ jsx(FaInstagram, {}) }) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space40" }),
    /* @__PURE__ */ jsx("div", { className: "copyright-area", children: /* @__PURE__ */ jsxs(Row, { className: "align-items-center", children: [
      /* @__PURE__ */ jsx(Col, { md: 5, children: /* @__PURE__ */ jsx("div", { className: "logo", children: /* @__PURE__ */ jsx(Link, { to: "/home-1", children: /* @__PURE__ */ jsx("img", { src: FooterLogo, alt: "" }) }) }) }),
      /* @__PURE__ */ jsx(Col, { md: 7, children: /* @__PURE__ */ jsxs("div", { className: "coppyright text-right", children: [
        /* @__PURE__ */ jsxs(Link, { to: "", children: [
          "@",
          currentYear,
          " WebDock Studio"
        ] }),
        /* @__PURE__ */ jsx(Link, { to: "", children: "Security" }),
        /* @__PURE__ */ jsx(Link, { to: "", children: "Your Privacy" }),
        /* @__PURE__ */ jsx(Link, { to: "", children: "Terms" })
      ] }) })
    ] }) })
  ] }) });
};
const MainSpan = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAVCAYAAABG1c6oAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFeSURBVHgBjZSBccMgDEVxJ2AENmhHoBt0BI/gDeoN6g3cTtBukOsEHsHtBGQDBV2+goKBoDsuHF8S0hOxMQ0jojGuU1w7Fu/HVsxTJZHj4LhdcfSFxbYiuTO9Fp03BPnKZTt8bE8ybpNaFUTtBT5zT7IdzgdmcT8ppmyhyFSYUbJvvh2/pFok+GmNoDlTYgaHsdAeaaYKjZcLi8wgLlmb0t6szlf2xT4VghZ+lOOMYK7snRKvGzNKk15VHOc5GThOSrBZEkI1n9nZToobOgnysM8iDMNwVvOS/X9cIffN9my2xEzDzqsKqNZXmG6amTNp4prNAj0UzmUo7oZOMdvuhBT46NnIgBLT7JBQ9RtdpyzViT6h5Q+FISVTN7oKswWa6CHT+fL6R0Ix9Q0fnzNtJbQHJsdOqvpQScqO/IHlVvhf9AvpOa7RXN/fa3yzf6bXUMlCx79em1lnctub5AJtOCWr3awPxAAAAABJRU5ErkJggg==";
const Hero$3 = () => {
  return /* @__PURE__ */ jsx("div", { className: "hero-area6", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Row, { className: "align-items-center", children: [
    /* @__PURE__ */ jsx(Col, { lg: 5, children: /* @__PURE__ */ jsxs("div", { className: "main-heading", children: [
      /* @__PURE__ */ jsxs("span", { className: "span", "data-aos": "fade-left", "data-aos-duration": "700", children: [
        /* @__PURE__ */ jsx("img", { src: MainSpan, alt: "" }),
        " Top Choice For Websites Worldwide"
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-anime-style-3", children: "Build Your Website With WebDocks Studio" }),
      /* @__PURE__ */ jsx("div", { className: "space16" }),
      /* @__PURE__ */ jsx("p", { "data-aos": "fade-right", "data-aos-duration": "700", children: "WebDock takes the Customizer to the next level so you can customize every aspect your website single interface." }),
      /* @__PURE__ */ jsx("div", { className: "space30" }),
      /* @__PURE__ */ jsxs("div", { className: "buttons", "data-aos": "fade-right", "data-aos-duration": "900", children: [
        /* @__PURE__ */ jsx(Link, { to: "/account", className: "theme-btn8", children: /* @__PURE__ */ jsxs("span", { className: "tb8", children: [
          "Get Started Now",
          /* @__PURE__ */ jsx("span", { className: "arrow", children: /* @__PURE__ */ jsx(FaArrowRight, {}) })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "video-action-btn1 popup-youtube", children: [
          /* @__PURE__ */ jsx("div", { className: "" }),
          /* @__PURE__ */ jsx("div", { className: "video-btn-pera", children: /* @__PURE__ */ jsx("p", { children: "Play Video" }) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Col, { lg: 7, children: /* @__PURE__ */ jsxs("div", { className: "images-all", "data-aos": "zoom-out", "data-aos-duration": "800", children: [
      /* @__PURE__ */ jsx("div", { className: "image1" }),
      /* @__PURE__ */ jsx("div", { className: "image2 animate1" }),
      /* @__PURE__ */ jsx("div", { className: "image3 shape-animaiton2" })
    ] }) })
  ] }) }) });
};
const MobileTop$1 = () => {
  const { isOpen, toggle } = useToggle();
  const sidebarRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggle();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, toggle]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "mobile-header mobile-header3 d-block d-lg-none ", children: /* @__PURE__ */ jsx(Container, { fluid: true, children: /* @__PURE__ */ jsx(Col, { xs: 12, children: /* @__PURE__ */ jsxs("div", { className: "mobile-header-elements", children: [
      /* @__PURE__ */ jsx("div", { className: "mobile-logo", children: /* @__PURE__ */ jsx(Link, { to: "/home-1", children: /* @__PURE__ */ jsx("img", { src: Logo, alt: "" }) }) }),
      /* @__PURE__ */ jsx("div", { onClick: toggle, className: "mobile-nav-icon", children: /* @__PURE__ */ jsx(FaBarsStaggered, {}) })
    ] }) }) }) }),
    /* @__PURE__ */ jsxs("div", { ref: sidebarRef, className: `mobile-sidebar mobile-sidebar4  d-block d-lg-none ${isOpen ? "mobile-menu-active" : ""}`, children: [
      /* @__PURE__ */ jsx("div", { className: "logo-m", children: /* @__PURE__ */ jsx(Link, { to: "/home-1", children: /* @__PURE__ */ jsx("img", { src: HeaderLogo1, alt: "" }) }) }),
      /* @__PURE__ */ jsx("div", { onClick: toggle, className: "menu-close", children: /* @__PURE__ */ jsx(FaXmark, {}) }),
      /* @__PURE__ */ jsxs("div", { className: "mobile-nav", children: [
        /* @__PURE__ */ jsx(MobileMenu, {}),
        /* @__PURE__ */ jsxs(Link, { className: "sidebar1-btn", to: "/contact", children: [
          /* @__PURE__ */ jsx("span", { children: "Book a Consultation" }),
          /* @__PURE__ */ jsx("span", { className: "arrow", children: /* @__PURE__ */ jsx(FaArrowRight, {}) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "contact-infos", children: [
          /* @__PURE__ */ jsx("h3", { children: "Contact Info" }),
          /* @__PURE__ */ jsxs("div", { className: "box", children: [
            /* @__PURE__ */ jsx("div", { className: "icon", children: /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FiPhone, {}) }) }),
            /* @__PURE__ */ jsx("div", { className: "pera", children: /* @__PURE__ */ jsx(Link, { to: "tel:921-888-0022", children: "921-888-0022" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "box", children: [
            /* @__PURE__ */ jsx("div", { className: "icon", children: /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaRegEnvelope, {}) }) }),
            /* @__PURE__ */ jsx("div", { className: "pera", children: /* @__PURE__ */ jsx(Link, { to: "mailto:example@visafast.com", children: "example@visafast.com" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "contact-infos", children: [
          /* @__PURE__ */ jsx("h3", { children: "Our Location" }),
          /* @__PURE__ */ jsxs("div", { className: "box", children: [
            /* @__PURE__ */ jsx("div", { className: "icon", children: /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(SlLocationPin, {}) }) }),
            /* @__PURE__ */ jsx("div", { className: "pera", children: /* @__PURE__ */ jsxs(Link, { to: "", children: [
              "55 East Birchwood Ave.Brooklyn, ",
              /* @__PURE__ */ jsx("br", {}),
              "New York 11201,United States"
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "contact-infos", children: [
          /* @__PURE__ */ jsx("h3", { children: "Our Location" }),
          /* @__PURE__ */ jsxs("ul", { className: "icon-list", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "", children: /* @__PURE__ */ jsx(FaLinkedinIn, {}) }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "", children: /* @__PURE__ */ jsx(FaXTwitter, {}) }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "", children: /* @__PURE__ */ jsx(FaYoutube, {}) }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "", children: /* @__PURE__ */ jsx(FaInstagram, {}) }) })
          ] })
        ] })
      ] })
    ] })
  ] });
};
const Navbar1 = () => {
  const { scrollY } = useScrollEvent();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("header", { children: /* @__PURE__ */ jsx("div", { className: `header-area header-area6 header-area-all d-none d-lg-block ${scrollY > 100 && "sticky"}`, id: "header", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { xs: 12, children: /* @__PURE__ */ jsxs("div", { className: "header-elements", children: [
      /* @__PURE__ */ jsx("div", { className: "site-logo home1-site-logo", children: /* @__PURE__ */ jsx(Link, { to: "/home-1", children: /* @__PURE__ */ jsx("img", { src: Webdock, alt: "" }) }) }),
      /* @__PURE__ */ jsx("div", { className: "main-menu-ex main-menu-ex1", children: /* @__PURE__ */ jsx(Menu, {}) }),
      /* @__PURE__ */ jsx("div", { className: "header4-buttons", children: /* @__PURE__ */ jsx(Link, { to: "/account", className: "theme-btn8", children: /* @__PURE__ */ jsxs("span", { className: "tb8", children: [
        "Get Started Now",
        /* @__PURE__ */ jsx("span", { className: "arrow", children: /* @__PURE__ */ jsx(FaArrowRight, {}) })
      ] }) }) })
    ] }) }) }) }) }) }),
    /* @__PURE__ */ jsx(MobileTop$1, {})
  ] });
};
const meta$7 = () => {
  return [{ title: "Web Page Builder" }];
};
const home1 = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(BasicLayout, { children: [
    /* @__PURE__ */ jsx(Navbar1, {}),
    /* @__PURE__ */ jsx(Hero$3, {}),
    /* @__PURE__ */ jsx(Counter$1, {}),
    /* @__PURE__ */ jsx(Editing, {}),
    /* @__PURE__ */ jsx(Feature, {}),
    /* @__PURE__ */ jsx(Brands$1, {}),
    /* @__PURE__ */ jsx(Faq, {}),
    /* @__PURE__ */ jsx(CTA$1, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] }) });
};
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home1,
  meta: meta$7
}, Symbol.toStringTag, { value: "Module" }));
const Verify = () => {
  useEffect(() => {
    document.body.classList.add("body2", "body");
    return () => {
      document.body.classList.remove("body2", "body");
    };
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "log-in-area email-verify _relative", children: /* @__PURE__ */ jsxs(Container, { children: [
      /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 6, className: "m-auto text-center", children: /* @__PURE__ */ jsx("div", { className: "main-logo", children: /* @__PURE__ */ jsx(Link, { to: "/home-1" }) }) }) }),
      /* @__PURE__ */ jsx("div", { className: "space80" }),
      /* @__PURE__ */ jsx(Row, { className: "align-items-center", children: /* @__PURE__ */ jsx(Col, { lg: 6, className: "m-auto", children: /* @__PURE__ */ jsx("div", { className: "login-form", children: /* @__PURE__ */ jsxs("div", { className: "headding", children: [
        /* @__PURE__ */ jsx("h2", { children: "Verify Your Email!" }),
        /* @__PURE__ */ jsx("p", { children: "We sent you a verification link via email. Please click it to verify your email address. If you don’t see it, please wait up to 5 mins or check your SPAM folder." }),
        /* @__PURE__ */ jsx("div", { className: "space20" }),
        /* @__PURE__ */ jsx("div", { className: "button", children: /* @__PURE__ */ jsx(Link, { to: "#", className: "theme-btn2", children: "Open Email" }) })
      ] }) }) }) })
    ] }) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "bg-area-all",
        style: {
          //backgroundImage: `url(${forgotBg})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "390px"
        }
      }
    )
  ] });
};
const meta$6 = () => {
  return [{ title: "Web Page Builder" }];
};
const index$2 = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Verify, {}) });
};
const route14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$2,
  meta: meta$6
}, Symbol.toStringTag, { value: "Module" }));
function loader({ request }) {
  return redirect("/home-1");
}
function Index() {
  return null;
}
const route15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const About = () => {
  const [CountUp, setCountUp] = useState(null);
  useEffect(() => {
    import("react-countup").then((mod) => {
      setCountUp(() => mod.default);
    });
  }, []);
  if (!CountUp) return null;
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "about-boxs", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Row, { children: [
    /* @__PURE__ */ jsx(Col, { lg: 4, md: 6, children: /* @__PURE__ */ jsxs("div", { className: "single-box", children: [
      /* @__PURE__ */ jsx("div", { className: "icon" }),
      /* @__PURE__ */ jsxs("div", { className: "headding2", children: [
        /* @__PURE__ */ jsx("h2", { children: /* @__PURE__ */ jsx(CountUp, { end: 5, suffix: "K+" }) }),
        /* @__PURE__ */ jsx("p", { children: "Total App Users" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Col, { lg: 4, md: 6, children: /* @__PURE__ */ jsxs("div", { className: "single-box", children: [
      /* @__PURE__ */ jsx("div", { className: "icon" }),
      /* @__PURE__ */ jsxs("div", { className: "headding2", children: [
        /* @__PURE__ */ jsx("h2", { children: /* @__PURE__ */ jsx(CountUp, { end: 4.5, decimals: 1, suffix: "K+" }) }),
        /* @__PURE__ */ jsx("p", { children: "Satisfied Client" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Col, { lg: 4, md: 6, children: /* @__PURE__ */ jsxs("div", { className: "single-box", children: [
      /* @__PURE__ */ jsx("div", { className: "icon" }),
      /* @__PURE__ */ jsxs("div", { className: "headding2", children: [
        /* @__PURE__ */ jsx("h2", { children: /* @__PURE__ */ jsx(CountUp, { end: 4, suffix: "K+" }) }),
        /* @__PURE__ */ jsx("p", { children: "Our Verified Client" })
      ] })
    ] }) })
  ] }) }) }) });
};
const About2 = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "about-page-area1 sp", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Row, { className: "align-items-center", children: [
    /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsx("div", { className: "about-img" }) }),
    /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsxs("div", { className: "headding2", children: [
      /* @__PURE__ */ jsx("h2", { children: "Elevate Engagement: Introducing Of WebDock Studio." }),
      /* @__PURE__ */ jsx("div", { className: "space16" }),
      /* @__PURE__ */ jsx("p", { children: "Revolutionise your approach to email marketing with eSoft. As pioneers the industry, we bring you a WebDock Studio. comprehensive solution that no only simplifies but an transforms best option elevate and engagement." }),
      /* @__PURE__ */ jsxs("ul", { className: "list", children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaCheck, {}) }),
          "Increased Organic Traffic"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaCheck, {}) }),
          "Regular Performance Monitoring"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaCheck, {}) }),
          "Improved Search Engine Rankings"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space30" }),
      /* @__PURE__ */ jsx(Link, { to: "/account", className: "theme-btn2", children: "Get Started Now" })
    ] }) })
  ] }) }) }) });
};
const Brands = () => {
  const tiltRef = useRef(null);
  useEffect(() => {
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        max: 20,
        speed: 500,
        glare: true,
        "max-glare": 0.2,
        scale: 1.05,
        perspective: 1e3
      });
    }
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "brand-area3 sp", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 6, className: "m-auto text-center", children: /* @__PURE__ */ jsxs("div", { className: "headding2", children: [
      /* @__PURE__ */ jsx("h2", { children: "Connect entire workflows" }),
      /* @__PURE__ */ jsx("div", { className: "space10" }),
      /* @__PURE__ */ jsx("p", { children: "Join a growing community of satisfied customers! Over 4K+ users have already chosen eSoft for its reliability and performance." }),
      /* @__PURE__ */ jsx("div", { className: "space20" }),
      /* @__PURE__ */ jsx(Link, { to: "/features", className: "theme-btn2", children: "View All Integrations" })
    ] }) }) }),
    /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(
      "div",
      {
        ref: tiltRef,
        className: "big-logo",
        "data-tilt": true,
        "data-tilt-full-page-listening": true,
        "data-tilt-perspective": "1000",
        style: {
          display: "inline-block",
          transformStyle: "preserve-3d",
          willChange: "transform",
          transition: "transform 0.3s ease"
        }
      }
    ) })
  ] }) });
};
const Hero$2 = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "pages-hero", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Row, { className: "align-items-center", children: [
    /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsxs("div", { className: "main-headding", children: [
      /* @__PURE__ */ jsx("h1", { children: "About App" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Revolutionise & email marketing strategy with cutting-edge ",
        /* @__PURE__ */ jsx("br", {}),
        " software designed to elevate your campaigns, our intuitive."
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space30" }),
      /* @__PURE__ */ jsxs("div", { className: "hero-btns", children: [
        /* @__PURE__ */ jsx(Link, { to: "/account", className: "theme-btn2", children: "Get Started Now" }),
        /* @__PURE__ */ jsx(Link, { to: "/account", className: "theme-btn3", children: "Try For Free Now" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsx("div", { className: "hero-image shape-animaiton3" }) })
  ] }) }) }) });
};
const meta$5 = () => {
  return [{ title: "Web Page Builder" }];
};
const about = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(MainLayout, { children: [
    /* @__PURE__ */ jsx(Hero$2, {}),
    /* @__PURE__ */ jsx(About, {}),
    /* @__PURE__ */ jsx(About2, {}),
    /* @__PURE__ */ jsx(About3, {}),
    /* @__PURE__ */ jsx(Innovation, {}),
    /* @__PURE__ */ jsx(Brands, {})
  ] }) });
};
const route16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: about,
  meta: meta$5
}, Symbol.toStringTag, { value: "Module" }));
const meta$4 = () => {
  return [{ title: "Web Page Builder" }];
};
const error = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "body2 body", children: /* @__PURE__ */ jsx("div", { className: "error-all sp _relative", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx("div", { className: "space80" }),
    /* @__PURE__ */ jsx(Row, { className: "align-items-center", children: /* @__PURE__ */ jsx(Col, { lg: 8, className: "m-auto", children: /* @__PURE__ */ jsxs("div", { className: "erro-page", children: [
      /* @__PURE__ */ jsx("div", { className: "image text-center" }),
      /* @__PURE__ */ jsxs("div", { className: "headding2 text-center", children: [
        /* @__PURE__ */ jsx("h2", { children: "Sorry, Something Went Wrong" }),
        /* @__PURE__ */ jsx("div", { className: "space16" }),
        /* @__PURE__ */ jsx("p", { children: "But don't worry, we've got your back. Here are a few options to get you back on track: Contact Support: If you believe there's a problem with our site." }),
        /* @__PURE__ */ jsx("div", { className: "space30" }),
        /* @__PURE__ */ jsx(Link, { to: "/home-1", children: /* @__PURE__ */ jsx("span", { className: "theme-btn2", children: "Go Back To Home Page" }) })
      ] })
    ] }) }) })
  ] }) }) }) });
};
const route17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: error,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
const Login = () => {
  useEffect(() => {
    document.body.classList.add("body2", "body");
    return () => {
      document.body.classList.remove("body2", "body");
    };
  }, []);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "log-in-area sp _relative", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 6, className: "m-auto text-center", children: /* @__PURE__ */ jsx("div", { className: "main-logo", children: /* @__PURE__ */ jsx(Link, { to: "/home-1" }) }) }) }),
    /* @__PURE__ */ jsx("div", { className: "space80" }),
    /* @__PURE__ */ jsxs(Row, { className: "align-items-center", children: [
      /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsxs("div", { className: "login-form", children: [
        /* @__PURE__ */ jsxs("div", { className: "headding", children: [
          /* @__PURE__ */ jsx("h2", { children: "Log In" }),
          /* @__PURE__ */ jsx("p", { children: "Please fill your email and password to sign in." })
        ] }),
        /* @__PURE__ */ jsxs(Form, { action: "#", className: "inputs", children: [
          /* @__PURE__ */ jsxs("div", { className: "single-inputs", children: [
            /* @__PURE__ */ jsx(Form.Label, { children: "Email Address" }),
            /* @__PURE__ */ jsx(Form.Control, { type: "text", placeholder: "Enter your email" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "single-inputs", children: [
            /* @__PURE__ */ jsx(Form.Label, { children: "Password" }),
            /* @__PURE__ */ jsx(Form.Control, { type: "password", placeholder: "Enter your password" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "button", children: /* @__PURE__ */ jsx(Button, { className: "theme-btn2", children: "Log In" }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "forgot-text", children: /* @__PURE__ */ jsxs("p", { children: [
          "Don’t have an account?",
          /* @__PURE__ */ jsx(Link, { className: "singup", to: "/account", children: "Sign up today" }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx(Link, { to: "/forgot", children: "Forget password" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "brand-buttons", children: [
          /* @__PURE__ */ jsx(Link, { to: "", children: " Sign in with Google" }),
          /* @__PURE__ */ jsx(Link, { to: "", children: " Sign in with Apple" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsx("div", { className: "login-img" }) })
    ] })
  ] }) }) });
};
const meta$3 = () => {
  return [{ title: "Web Page Builder" }];
};
const page = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Login, {}) });
};
const route18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: page,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
const Reset = () => {
  useEffect(() => {
    document.body.classList.add("body2", "body");
    return () => {
      document.body.classList.remove("body2", "body");
    };
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "log-in-area reset-area _relative", children: /* @__PURE__ */ jsxs(Container, { children: [
      /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 6, className: "m-auto text-center", children: /* @__PURE__ */ jsx("div", { className: "main-logo", children: /* @__PURE__ */ jsx(Link, { to: "/home-1" }) }) }) }),
      /* @__PURE__ */ jsx("div", { className: "space80" }),
      /* @__PURE__ */ jsx(Row, { className: "align-items-center", children: /* @__PURE__ */ jsx(Col, { lg: 6, className: "m-auto", children: /* @__PURE__ */ jsxs("div", { className: "login-form", children: [
        /* @__PURE__ */ jsxs("div", { className: "headding", children: [
          /* @__PURE__ */ jsx("h2", { children: "Reset Password" }),
          /* @__PURE__ */ jsx("p", { children: "If you want to reset your password, please enter your new password below." })
        ] }),
        /* @__PURE__ */ jsxs(Form, { action: "#", className: "inputs", children: [
          /* @__PURE__ */ jsxs("div", { className: "single-inputs", children: [
            /* @__PURE__ */ jsx(Form.Label, { children: "New Password" }),
            /* @__PURE__ */ jsx(Form.Control, { type: "password", placeholder: "Enter your password" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "single-inputs", children: [
            /* @__PURE__ */ jsx(Form.Label, { children: "Confirm Password" }),
            /* @__PURE__ */ jsx(Form.Control, { type: "password", placeholder: "Confirm your password" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "button", children: /* @__PURE__ */ jsx(Button, { className: "theme-btn2", children: "Send Recovery Link" }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "forgot-text", children: /* @__PURE__ */ jsxs("p", { children: [
          "If you didn’t request a password ",
          /* @__PURE__ */ jsx("br", {}),
          " recovery link, please ignore this."
        ] }) })
      ] }) }) })
    ] }) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "bg-area-all",
        style: {
          //backgroundImage: `url(${forgotBg})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "390px"
        }
      }
    )
  ] });
};
const meta$2 = () => {
  return [{ title: "Web Page Builder" }];
};
const index$1 = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Reset, {}) });
};
const route19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index$1,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const blogData$1 = [
  {
    date: "10 October 2023",
    title: "Power Up Your Digital Presence An Unleashing the Potential of Email.",
    desc: "Online presence with our dynamic best landing pages, designed to captivate."
  },
  {
    date: "20 October 2023",
    title: "Transform Your Online Success, Harnessing the Power of Cutting",
    desc: "Our comprehensive suite of tools best empowers your brand to break through."
  },
  {
    date: "10 October 2023",
    title: "Email Marketing SaaS, Riveting Landing Pages, and Trendsetting",
    desc: "eSoft Eestablishing an influential online presence. With precision-targeted App."
  }
];
const Blog = () => {
  return /* @__PURE__ */ jsx("div", { className: "blog-sce1 sp", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 12, children: /* @__PURE__ */ jsxs(Row, { className: "blog-big-sec align-items-center", children: [
      /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsx("div", { className: "image-main" }) }),
      /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsxs("div", { className: "headding2", children: [
        /* @__PURE__ */ jsx("span", { className: "span", children: "Email Marketing" }),
        /* @__PURE__ */ jsx("h3", { children: /* @__PURE__ */ jsx(Link, { to: "/blog-details", children: "Elevate Engagement, Drive Conversions, Transform Ideas into Reality with WebDock Studio" }) }),
        /* @__PURE__ */ jsx("p", { children: "Revolutionise your marketing strategy with an our cutting-edge Email Marketing SaaS. Seamlessly manage and optimise WebDock Studio." }),
        /* @__PURE__ */ jsxs("div", { className: "bottom-area", children: [
          /* @__PURE__ */ jsxs("div", { className: "autor-area", children: [
            /* @__PURE__ */ jsx("div", { className: "image" }),
            /* @__PURE__ */ jsxs("div", { className: "headding", children: [
              /* @__PURE__ */ jsx("h5", { children: /* @__PURE__ */ jsx(Link, { to: "#", children: "Jonson Brans" }) }),
              /* @__PURE__ */ jsx("p", { children: "10 October 2023" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "button", children: /* @__PURE__ */ jsxs(Link, { to: "/blog-details", children: [
            "Read More",
            /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaArrowRight, {}) })
          ] }) })
        ] })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx(Row, { children: blogData$1.map((item, index2) => /* @__PURE__ */ jsx(Col, { lg: 4, md: 6, children: /* @__PURE__ */ jsx("div", { className: "blog-box", children: /* @__PURE__ */ jsxs("div", { className: "headding", children: [
      /* @__PURE__ */ jsx("div", { className: "tags", children: /* @__PURE__ */ jsx(Link, { to: "#" }) }),
      /* @__PURE__ */ jsx("h4", { children: /* @__PURE__ */ jsx(Link, { to: "/blog-details", children: item.title }) }),
      /* @__PURE__ */ jsx("p", { children: item.desc }),
      /* @__PURE__ */ jsxs(Link, { to: "/blog-details", className: "learn", children: [
        "Read more",
        /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaArrowRight, {}) })
      ] })
    ] }) }) }, index2)) })
  ] }) });
};
const blogData2 = [
  {
    /*image: blogImg6,*/
    date: "10 October 2023",
    author: "Owen Lindgren",
    title: "Best Project Management Software eSoft",
    link: "/blog-details"
  },
  {
    /*image: blogImg1,*/
    date: "10 October 2023",
    author: "Rabby Mahmud",
    title: "The Ultimate Email Campaign Playbook",
    link: "/blog-details"
  },
  {
    /*image: blogImg2,*/
    date: "10 October 2023",
    author: "Rabby Mahmud",
    title: "Email Design: A Deep Dive in Visual Impact",
    link: "/blog-details"
  },
  {
    /*image: blogImg3,*/
    date: "10 October 2023",
    author: "Rabby Mahmud",
    title: "Our Proven Project Management Approach",
    link: "/blog-details"
  },
  {
    /*image: blogImg4,*/
    date: "10 October 2023",
    author: "Mr. Blanca White",
    title: "Empowering Projects Expert Management",
    link: "/blog-details"
  },
  {
    /*image: blogImg5,*/
    date: "10 October 2023",
    author: "Lois Stiedemann",
    title: "The Ultimate Email Campaign Playbook",
    link: "/blog-details"
  }
];
const TabBlogPane2 = ({ style }) => {
  return /* @__PURE__ */ jsx("div", { className: "tab-pane fade", id: "tab-contact2", role: "tabpanel", "aria-labelledby": "tab-contact2-tab", style, children: /* @__PURE__ */ jsx("div", { className: "all-boxs", children: /* @__PURE__ */ jsx(Row, { children: blogData2.map((item, index2) => /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsxs("div", { className: "blog-box", children: [
    /* @__PURE__ */ jsx("div", { className: "image" }),
    /* @__PURE__ */ jsxs("div", { className: "headding", children: [
      /* @__PURE__ */ jsxs("div", { className: "tags", children: [
        /* @__PURE__ */ jsx(Link, { to: "#", children: item.date }),
        /* @__PURE__ */ jsxs(Link, { to: "#", children: [
          " ",
          item.author
        ] })
      ] }),
      /* @__PURE__ */ jsx("h4", { children: /* @__PURE__ */ jsx(Link, { to: item.link, children: item.title }) }),
      /* @__PURE__ */ jsx("p", { children: "Effortlessly design stunning emails, automate your market workflow, & precisely target your audience for maximum." }),
      /* @__PURE__ */ jsxs(Link, { to: item.link, className: "learn", children: [
        "Read more",
        /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaArrowRight, {}) })
      ] })
    ] })
  ] }) }, index2)) }) }) });
};
const blogData3 = [
  {
    /*image: blogImg5,*/
    date: "10 October 2023",
    author: "Lois Stiedemann",
    title: "The Ultimate Email Campaign Playbook",
    link: "/blog-details"
  },
  {
    /*image: blogImg6,*/
    date: "10 October 2023",
    author: "Owen Lindgren",
    title: "Best Project Management Software eSoft",
    link: "/blog-details"
  },
  {
    /*image: blogImg1,*/
    date: "10 October 2023",
    author: "Rabby Mahmud",
    title: "The Ultimate Email Campaign Playbook",
    link: "/blog-details"
  },
  {
    /*image: blogImg2,*/
    date: "10 October 2023",
    author: "Rabby Mahmud",
    title: "Email Design: A Deep Dive in Visual Impact",
    link: "/blog-details"
  },
  {
    /*image: blogImg3,*/
    date: "10 October 2023",
    author: "Rabby Mahmud",
    title: "Our Proven Project Management Approach",
    link: "/blog-details"
  },
  {
    /*image: blogImg4,*/
    date: "10 October 2023",
    author: "Mr. Blanca White",
    title: "Empowering Projects Expert Management",
    link: "/blog-details"
  }
];
const TabBlogPane3 = ({ style }) => {
  return /* @__PURE__ */ jsx("div", { className: "tab-pane fade", id: "tab-contact3", role: "tabpanel", "aria-labelledby": "tab-contact3-tab", style, children: /* @__PURE__ */ jsx("div", { className: "all-boxs", children: /* @__PURE__ */ jsx(Row, { children: blogData3.map((item, index2) => /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsxs("div", { className: "blog-box", children: [
    /* @__PURE__ */ jsx("div", { className: "image" }),
    /* @__PURE__ */ jsxs("div", { className: "headding", children: [
      /* @__PURE__ */ jsxs("div", { className: "tags", children: [
        /* @__PURE__ */ jsx(Link, { to: "#", children: item.date }),
        /* @__PURE__ */ jsx(Link, { to: "#", children: item.author })
      ] }),
      /* @__PURE__ */ jsx("h4", { children: /* @__PURE__ */ jsx(Link, { to: item.link, children: item.title }) }),
      /* @__PURE__ */ jsx("p", { children: "Effortlessly design stunning emails, automate your market workflow, & precisely target your audience for maximum." }),
      /* @__PURE__ */ jsxs(Link, { to: item.link, className: "learn", children: [
        "Read more",
        /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaArrowRight, {}) })
      ] })
    ] })
  ] }) }, index2)) }) }) });
};
const blogData4 = [
  {
    /*image: blogImg4,*/
    date: "10 October 2023",
    author: "Mr. Blanca White",
    title: "Empowering Projects Expert Management",
    link: "/blog-details"
  },
  {
    /*image: blogImg5,*/
    date: "10 October 2023",
    author: "Lois Stiedemann",
    title: "The Ultimate Email Campaign Playbook",
    link: "/blog-details"
  },
  {
    /*image: blogImg6,*/
    date: "10 October 2023",
    author: "Owen Lindgren",
    title: "Best Project Management Software eSoft",
    link: "/blog-details"
  },
  {
    /*image: blogImg1,*/
    date: "10 October 2023",
    author: "Rabby Mahmud",
    title: "The Ultimate Email Campaign Playbook",
    link: "/blog-details"
  },
  {
    /*image: blogImg2,*/
    date: "10 October 2023",
    author: "Rabby Mahmud",
    title: "Email Design: A Deep Dive in Visual Impact",
    link: "/blog-details"
  },
  {
    /*image: blogImg3,*/
    date: "10 October 2023",
    author: "Rabby Mahmud",
    title: "Our Proven Project Management Approach",
    link: "/blog-details"
  }
];
const TabBlogPane4 = ({ style }) => {
  return /* @__PURE__ */ jsx("div", { className: "tab-pane fade", id: "tab-contact4", role: "tabpanel", "aria-labelledby": "tab-contact4-tab", style, children: /* @__PURE__ */ jsx("div", { className: "all-boxs", children: /* @__PURE__ */ jsx(Row, { children: blogData4.map((item, index2) => /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsxs("div", { className: "blog-box", children: [
    /* @__PURE__ */ jsx("div", { className: "image" }),
    /* @__PURE__ */ jsxs("div", { className: "headding", children: [
      /* @__PURE__ */ jsxs("div", { className: "tags", children: [
        /* @__PURE__ */ jsxs(Link, { to: "#", children: [
          " ",
          item.date
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: "#", children: [
          " ",
          item.author
        ] })
      ] }),
      /* @__PURE__ */ jsx("h4", { children: /* @__PURE__ */ jsx(Link, { to: item.link, children: item.title }) }),
      /* @__PURE__ */ jsx("p", { children: "Effortlessly design stunning emails, automate your market workflow, & precisely target your audience for maximum." }),
      /* @__PURE__ */ jsxs(Link, { to: item.link, className: "learn", children: [
        "Read more",
        /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaArrowRight, {}) })
      ] })
    ] })
  ] }) }, index2)) }) }) });
};
const blogData = [
  {
    /*image: blogImg1,*/
    date: "10 October 2023",
    author: "Rabby Mahmud",
    title: "The Ultimate Email Campaign Playbook",
    link: "/blog-details"
  },
  {
    /*image: blogImg2,*/
    date: "10 October 2023",
    author: "Rabby Mahmud",
    title: "Email Design: A Deep Dive in Visual Impact",
    link: "/blog-details"
  },
  {
    /*image: blogImg3,*/
    date: "10 October 2023",
    author: "Rabby Mahmud",
    title: "Our Proven Project Management Approach",
    link: "/blog-details"
  },
  {
    /*image: blogImg4,*/
    date: "10 October 2023",
    author: "Mr. Blanca White",
    title: "Empowering Projects Expert Management",
    link: "/blog-details"
  },
  {
    /*image: blogImg5,*/
    date: "10 October 2023",
    author: "Lois Stiedemann",
    title: "The Ultimate Email Campaign Playbook",
    link: "/blog-details"
  },
  {
    /*image: blogImg6,*/
    date: "10 October 2023",
    author: "Owen Lindgren",
    title: "Best Project Management Software eSoft",
    link: "/blog-details"
  }
];
const Blog2 = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setAnimate(false);
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [activeTab]);
  const getTabStyle = (tabName) => ({
    opacity: activeTab === tabName && animate ? 1 : 0,
    transform: activeTab === tabName && animate ? "translateY(0)" : "translateY(20px)",
    transition: "opacity 0.5s ease, transform 0.5s ease",
    pointerEvents: activeTab === tabName ? "auto" : "none",
    position: activeTab === tabName ? "relative" : "absolute",
    width: "100%"
  });
  return /* @__PURE__ */ jsx("div", { className: "blog-area-all sp", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsxs(Row, { className: "align-items-center", children: [
      /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsxs("div", { className: "headding2", children: [
        /* @__PURE__ */ jsx("h2", { children: "Our Latest Blog & News" }),
        /* @__PURE__ */ jsx("div", { className: "space16" }),
        /* @__PURE__ */ jsx("p", { children: "Our dynamic Landing Pages redefine user experiences, WebDock Studio ensuring every click counts, dive into the world of insightful." })
      ] }) }),
      /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsx("div", { className: "tabs-buttons", children: /* @__PURE__ */ jsxs("ul", { className: "nav nav-pills mb-3", id: "pills-tab", role: "tablist", style: { cursor: "pointer" }, children: [
        /* @__PURE__ */ jsx("li", { className: "nav-item", role: "presentation", children: /* @__PURE__ */ jsx(
          "button",
          {
            className: `nav-link ${activeTab === "all" ? "active" : ""}`,
            onClick: () => setActiveTab("all"),
            type: "button",
            role: "tab",
            "aria-selected": activeTab === "all",
            children: "All"
          }
        ) }),
        /* @__PURE__ */ jsx("li", { className: "nav-item", role: "presentation", children: /* @__PURE__ */ jsx(
          "button",
          {
            className: `nav-link ${activeTab === "resources" ? "active" : ""}`,
            onClick: () => setActiveTab("resources"),
            type: "button",
            role: "tab",
            "aria-selected": activeTab === "resources",
            children: "Resources"
          }
        ) }),
        /* @__PURE__ */ jsx("li", { className: "nav-item", role: "presentation", children: /* @__PURE__ */ jsx(
          "button",
          {
            className: `nav-link ${activeTab === "guides" ? "active" : ""}`,
            onClick: () => setActiveTab("guides"),
            type: "button",
            role: "tab",
            "aria-selected": activeTab === "guides",
            children: "Guides"
          }
        ) }),
        /* @__PURE__ */ jsx("li", { className: "nav-item", role: "presentation", children: /* @__PURE__ */ jsx(
          "button",
          {
            className: `nav-link ${activeTab === "updates" ? "active" : ""}`,
            onClick: () => setActiveTab("updates"),
            type: "button",
            role: "tab",
            "aria-selected": activeTab === "updates",
            children: "Updates"
          }
        ) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space30" }),
    /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 12, children: /* @__PURE__ */ jsxs("div", { className: "all-contact", style: { position: "relative", minHeight: "600px" }, children: [
      /* @__PURE__ */ jsx("div", { style: getTabStyle("all"), children: /* @__PURE__ */ jsx("div", { className: "all-boxs", children: /* @__PURE__ */ jsx(Row, { children: blogData.map((item, index2) => /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsxs("div", { className: "blog-box", children: [
        /* @__PURE__ */ jsx("div", { className: "image" }),
        /* @__PURE__ */ jsxs("div", { className: "headding", children: [
          /* @__PURE__ */ jsxs("div", { className: "tags", children: [
            /* @__PURE__ */ jsx(Link, { to: "#" }),
            /* @__PURE__ */ jsx(Link, { to: "#" })
          ] }),
          /* @__PURE__ */ jsx("h4", { children: /* @__PURE__ */ jsx(Link, { to: item.link, children: item.title }) }),
          /* @__PURE__ */ jsx("p", { children: "Effortlessly design stunning emails, automate your market workflow, & precisely target your audience for maximum." }),
          /* @__PURE__ */ jsxs(Link, { to: item.link, className: "learn", children: [
            "Read more",
            /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaArrowRight, {}) })
          ] })
        ] })
      ] }) }, index2)) }) }) }),
      /* @__PURE__ */ jsx(TabBlogPane2, { style: getTabStyle("resources") }),
      /* @__PURE__ */ jsx(TabBlogPane3, { style: getTabStyle("guides") }),
      /* @__PURE__ */ jsx(TabBlogPane4, { style: getTabStyle("updates") })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "space60" }),
    /* @__PURE__ */ jsx(Pagination, {})
  ] }) });
};
const Hero$1 = () => {
  useEffect(() => {
    document.body.classList.add("body2", "body");
    return () => {
      document.body.classList.remove("body2", "body");
    };
  }, []);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "pages-hero", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Row, { className: "align-items-center", children: [
    /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsxs("div", { className: "main-headding", children: [
      /* @__PURE__ */ jsx("h1", { children: "News & Articles" }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Revolutionise & email marketing strategy with cutting-edge ",
        /* @__PURE__ */ jsx("br", {}),
        "software designed to elevate your campaigns, our intuitive."
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space30" }),
      /* @__PURE__ */ jsxs("div", { className: "hero-btns", children: [
        /* @__PURE__ */ jsx(Link, { to: "/account", children: /* @__PURE__ */ jsx("span", { className: "theme-btn2", children: "Get Started Now" }) }),
        /* @__PURE__ */ jsx(Link, { to: "/account", children: /* @__PURE__ */ jsx("span", { className: "theme-btn3", children: "Try For Free Now" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Col, { lg: 1 }),
    /* @__PURE__ */ jsx(Col, { lg: 5, children: /* @__PURE__ */ jsx("form", { action: "#", children: /* @__PURE__ */ jsxs("div", { className: "search-area", children: [
      /* @__PURE__ */ jsx("div", { className: "input", children: /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Search for articles....." }) }),
      /* @__PURE__ */ jsx("div", { className: "button", children: /* @__PURE__ */ jsx("button", { type: "submit", children: /* @__PURE__ */ jsx(FaMagnifyingGlass, {}) }) })
    ] }) }) })
  ] }) }) }) });
};
const meta$1 = () => {
  return [{ title: "Web Page Builder" }];
};
const index = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(MainLayout, { children: [
    /* @__PURE__ */ jsx(Hero$1, {}),
    /* @__PURE__ */ jsx(Blog, {}),
    /* @__PURE__ */ jsx(Innovation, {}),
    /* @__PURE__ */ jsx(Blog2, {})
  ] }) });
};
const route20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: index,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const Benefit = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "buy-sell-bottom2", id: "system", children: [
      /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 6, className: "m-auto text-center", children: /* @__PURE__ */ jsxs("div", { className: "heading9", children: [
        /* @__PURE__ */ jsxs("span", { className: "span", "data-aos": "zoom-in-left", "data-aos-duration": "700", children: [
          /* @__PURE__ */ jsx("img", { src: span, alt: "" }),
          " eSoft Benefits"
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "text-anime-style-3", children: "eSoft HR Use Of Benefits" })
      ] }) }) }) }),
      /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx("div", { className: "bg", children: /* @__PURE__ */ jsxs(Row, { className: "align-items-center", children: [
        /* @__PURE__ */ jsxs(Col, { lg: 3, children: [
          /* @__PURE__ */ jsxs("div", { className: "box-area-all", "data-aos": "flip-right", "data-aos-duration": "900", children: [
            /* @__PURE__ */ jsx("div", { className: "icon", children: /* @__PURE__ */ jsx("img", { src: systemIcon1, alt: "" }) }),
            /* @__PURE__ */ jsxs("div", { className: "single-box heading7", children: [
              /* @__PURE__ */ jsx("h5", { children: /* @__PURE__ */ jsx(Link, { to: "", children: "Trade Local Currency" }) }),
              /* @__PURE__ */ jsx("div", { className: "space10" }),
              /* @__PURE__ */ jsx("p", { children: "With our intuitive interface and robust features, you buy, sell." })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space50" }),
          /* @__PURE__ */ jsxs("div", { className: "box-area-all box-area-all2", "data-aos": "flip-right", "data-aos-duration": "900", children: [
            /* @__PURE__ */ jsx("div", { className: "icon", children: /* @__PURE__ */ jsx("img", { src: systemIcon2, alt: "" }) }),
            /* @__PURE__ */ jsxs("div", { className: "single-box heading7", children: [
              /* @__PURE__ */ jsx("h5", { children: /* @__PURE__ */ jsx(Link, { to: "", children: "Largest Coin Offer" }) }),
              /* @__PURE__ */ jsx("div", { className: "space10" }),
              /* @__PURE__ */ jsx("p", { children: "Plus, our commitment to the security means that PayCoin." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Col, { lg: 6, children: /* @__PURE__ */ jsxs("div", { className: "service1-main-images", "data-aos": "zoom-out", "data-aos-duration": "900", children: [
          /* @__PURE__ */ jsx("div", { className: "main-img1", children: /* @__PURE__ */ jsx("img", { src: systemImg1, alt: "" }) }),
          /* @__PURE__ */ jsx("div", { className: "main-img2 animate1", children: /* @__PURE__ */ jsx("img", { src: systemImg2, alt: "" }) }),
          /* @__PURE__ */ jsx("div", { className: "shape1", children: /* @__PURE__ */ jsx("img", { src: shape1$1, alt: "" }) }),
          /* @__PURE__ */ jsx("div", { className: "shape2", children: /* @__PURE__ */ jsx("img", { src: shape2$1, alt: "" }) }),
          /* @__PURE__ */ jsx("div", { className: "shape3", children: /* @__PURE__ */ jsx("img", { src: shape3, alt: "" }) }),
          /* @__PURE__ */ jsx("div", { className: "shape4", children: /* @__PURE__ */ jsx("img", { src: shape4, alt: "" }) })
        ] }) }),
        /* @__PURE__ */ jsxs(Col, { lg: 3, children: [
          /* @__PURE__ */ jsxs("div", { className: "box-area-all box-area-all3", "data-aos": "flip-right", "data-aos-duration": "900", children: [
            /* @__PURE__ */ jsx("div", { className: "icon", children: /* @__PURE__ */ jsx("img", { src: systemIcon3, alt: "" }) }),
            /* @__PURE__ */ jsxs("div", { className: "single-box heading7", children: [
              /* @__PURE__ */ jsx("h5", { children: /* @__PURE__ */ jsx(Link, { to: "", children: "Safe And Secure" }) }),
              /* @__PURE__ */ jsx("div", { className: "space10" }),
              /* @__PURE__ */ jsx("p", { children: "Trusted partner in the world of crypto trading Join us today." })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space50" }),
          /* @__PURE__ */ jsxs("div", { className: "box-area-all box-area-all4", "data-aos": "flip-right", "data-aos-duration": "900", children: [
            /* @__PURE__ */ jsx("div", { className: "icon", children: /* @__PURE__ */ jsx("img", { src: systemIcon4, alt: "" }) }),
            /* @__PURE__ */ jsxs("div", { className: "single-box heading7", children: [
              /* @__PURE__ */ jsx("h5", { children: /* @__PURE__ */ jsx(Link, { to: "", children: "Trade For Anywhere" }) }),
              /* @__PURE__ */ jsx("div", { className: "space10" }),
              /* @__PURE__ */ jsx("p", { children: "Resources designed to help navigate best the dynamic" })
            ] })
          ] })
        ] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space100" })
  ] });
};
const Counter = () => {
  const [CountUp, setCountUp] = useState(null);
  useEffect(() => {
    import("react-countup").then((mod) => {
      setCountUp(() => mod.default);
    });
  }, []);
  if (!CountUp) return null;
  return /* @__PURE__ */ jsx("div", { className: "counters6", id: "counters", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Row, { children: [
    /* @__PURE__ */ jsx(Col, { lg: 3, xs: 6, children: /* @__PURE__ */ jsxs("div", { className: "counter-box box1", "data-aos": "zoom-out", "data-aos-duration": "800", children: [
      /* @__PURE__ */ jsx("h2", { children: /* @__PURE__ */ jsx("span", { className: "counter", children: /* @__PURE__ */ jsx(CountUp, { end: 16, suffix: " M+" }) }) }),
      /* @__PURE__ */ jsx("p", { children: "Built With Elementor" })
    ] }) }),
    /* @__PURE__ */ jsx(Col, { lg: 3, xs: 6, children: /* @__PURE__ */ jsxs("div", { className: "counter-box box2", "data-aos": "zoom-out", "data-aos-duration": "1000", children: [
      /* @__PURE__ */ jsx("h2", { children: /* @__PURE__ */ jsx("span", { className: "counter", children: /* @__PURE__ */ jsx(CountUp, { end: 6.5, decimals: 1, suffix: " K+" }) }) }),
      /* @__PURE__ */ jsx("p", { children: "5 Star Reviews" })
    ] }) }),
    /* @__PURE__ */ jsx(Col, { lg: 3, xs: 6, children: /* @__PURE__ */ jsxs("div", { className: "counter-box box3", "data-aos": "zoom-out", "data-aos-duration": "1100", children: [
      /* @__PURE__ */ jsx("h2", { children: /* @__PURE__ */ jsx("span", { className: "counter", children: /* @__PURE__ */ jsx(CountUp, { end: 100, suffix: "+" }) }) }),
      /* @__PURE__ */ jsx("p", { children: "5 Star Reviews" })
    ] }) }),
    /* @__PURE__ */ jsx(Col, { lg: 3, xs: 6, children: /* @__PURE__ */ jsxs("div", { className: "counter-box box4", "data-aos": "zoom-out", "data-aos-duration": "600", children: [
      /* @__PURE__ */ jsx("h2", { children: /* @__PURE__ */ jsx("span", { className: "counter", children: /* @__PURE__ */ jsx(CountUp, { end: 16, suffix: "Sec." }) }) }),
      /* @__PURE__ */ jsx("p", { children: "15 Second An Elementor" })
    ] }) })
  ] }) }) });
};
const CTA = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "cta2-area",
        style: {
          backgroundImage: `url(${cta2bg})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        },
        children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 6, className: "m-auto text-center", children: /* @__PURE__ */ jsxs("div", { className: "headding2-w pbmit-heading-subheading animation-style2", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-anime-style-3", children: "Join 500,000+ SEO's Who Trust eSoft For Insights That Help Their Business Grow." }),
          /* @__PURE__ */ jsx("div", { className: "space16" }),
          /* @__PURE__ */ jsx("p", { "data-aos": "fade-up", "data-aos-duration": "800", children: "eSoft has exceeded our expectations in every way. The ease with & which we can target specific audience segments has an transform." }),
          /* @__PURE__ */ jsx("div", { className: "space30" }),
          /* @__PURE__ */ jsx("div", { className: "", "data-aos": "fade-up", "data-aos-duration": "1000", children: /* @__PURE__ */ jsx(Link, { to: "/account", className: "theme-btn3", children: "Get Started For Free" }) })
        ] }) }) }) })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "cta2-main-image", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 12, children: /* @__PURE__ */ jsxs("div", { className: "cta2-images", children: [
      /* @__PURE__ */ jsx("div", { className: "img1", children: /* @__PURE__ */ jsx("img", { src: Cta2main, alt: "" }) }),
      /* @__PURE__ */ jsx("div", { className: "shape1", children: /* @__PURE__ */ jsx("img", { src: cta2shape2, alt: "" }) }),
      /* @__PURE__ */ jsx("div", { className: "shape2", children: /* @__PURE__ */ jsx("img", { src: cta2shape1, alt: "" }) })
    ] }) }) }) }) })
  ] });
};
const MobileTop = () => {
  const { isOpen, toggle } = useToggle();
  const sidebarRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggle();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, toggle]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "mobile-header mobile-header3 d-block d-lg-none ", children: /* @__PURE__ */ jsx(Container, { fluid: true, children: /* @__PURE__ */ jsx(Col, { xs: 12, children: /* @__PURE__ */ jsxs("div", { className: "mobile-header-elements", children: [
      /* @__PURE__ */ jsx("div", { className: "mobile-logo", children: /* @__PURE__ */ jsx(Link, { to: "/home-1", children: /* @__PURE__ */ jsx("img", { src: Logo, alt: "" }) }) }),
      /* @__PURE__ */ jsx("div", { onClick: toggle, className: "mobile-nav-icon", children: /* @__PURE__ */ jsx(FaBarsStaggered, {}) })
    ] }) }) }) }),
    /* @__PURE__ */ jsxs("div", { ref: sidebarRef, className: `mobile-sidebar mobile-sidebar4  d-block d-lg-none ${isOpen ? "mobile-menu-active" : ""}`, children: [
      /* @__PURE__ */ jsx("div", { className: "logo-m", children: /* @__PURE__ */ jsx(Link, { to: "/home-1", children: /* @__PURE__ */ jsx("img", { src: HeaderLogo1, alt: "" }) }) }),
      /* @__PURE__ */ jsx("div", { onClick: toggle, className: "menu-close", children: /* @__PURE__ */ jsx(FaXmark, {}) }),
      /* @__PURE__ */ jsxs("div", { className: "mobile-nav", children: [
        /* @__PURE__ */ jsx(MobileMenu, {}),
        /* @__PURE__ */ jsxs(Link, { className: "sidebar1-btn", to: "/contact", children: [
          /* @__PURE__ */ jsx("span", { children: "Book a Consultation" }),
          /* @__PURE__ */ jsx("span", { className: "arrow", children: /* @__PURE__ */ jsx(FaArrowRight, {}) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "contact-infos", children: [
          /* @__PURE__ */ jsx("h3", { children: "Contact Info" }),
          /* @__PURE__ */ jsxs("div", { className: "box", children: [
            /* @__PURE__ */ jsx("div", { className: "icon", children: /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FiPhone, {}) }) }),
            /* @__PURE__ */ jsx("div", { className: "pera", children: /* @__PURE__ */ jsx(Link, { to: "tel:921-888-0022", children: "921-888-0022" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "box", children: [
            /* @__PURE__ */ jsx("div", { className: "icon", children: /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaRegEnvelope, {}) }) }),
            /* @__PURE__ */ jsx("div", { className: "pera", children: /* @__PURE__ */ jsx(Link, { to: "mailto:example@visafast.com", children: "example@visafast.com" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "contact-infos", children: [
          /* @__PURE__ */ jsx("h3", { children: "Our Location" }),
          /* @__PURE__ */ jsxs("div", { className: "box", children: [
            /* @__PURE__ */ jsx("div", { className: "icon", children: /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(SlLocationPin, {}) }) }),
            /* @__PURE__ */ jsx("div", { className: "pera", children: /* @__PURE__ */ jsxs(Link, { to: "", children: [
              "55 East Birchwood Ave.Brooklyn, ",
              /* @__PURE__ */ jsx("br", {}),
              "New York 11201,United States"
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "contact-infos", children: [
          /* @__PURE__ */ jsx("h3", { children: "Our Location" }),
          /* @__PURE__ */ jsxs("ul", { className: "icon-list", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "", children: /* @__PURE__ */ jsx(FaLinkedinIn, {}) }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "", children: /* @__PURE__ */ jsx(FaXTwitter, {}) }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "", children: /* @__PURE__ */ jsx(FaYoutube, {}) }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "", children: /* @__PURE__ */ jsx(FaInstagram, {}) }) })
          ] })
        ] })
      ] })
    ] })
  ] });
};
const Header = () => {
  const { scrollY } = useScrollEvent();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("header", { children: /* @__PURE__ */ jsx("div", { className: `header-area header-area9 header-area-all d-none d-lg-block ${scrollY > 100 && "sticky"}`, id: "header", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { xs: 12, children: /* @__PURE__ */ jsxs("div", { className: "header-elements", children: [
      /* @__PURE__ */ jsx("div", { className: "site-logo home1-site-logo", children: /* @__PURE__ */ jsx(Link, { to: "/home-1", children: /* @__PURE__ */ jsx("img", { src: Logo, alt: "" }) }) }),
      /* @__PURE__ */ jsx("div", { className: "main-menu-ex main-menu-ex1", children: /* @__PURE__ */ jsx(Menu, {}) }),
      /* @__PURE__ */ jsx("div", { className: "header-buttons", children: /* @__PURE__ */ jsxs(Link, { to: "/account", className: "theme-btn15", children: [
        "Get quip free now",
        /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaArrowRight, {}) })
      ] }) })
    ] }) }) }) }) }) }),
    /* @__PURE__ */ jsx(MobileTop, {})
  ] });
};
const heroImages = [
  { className: "image1", image: hero1 },
  { className: "image2 shape-animaiton3", image: hero2 },
  { className: "image3 shape-animaiton2", image: hero3 },
  { className: "image4 animate1", image: hero4 },
  { className: "image5", image: hero5 },
  { className: "main-img", image: heroMain }
];
const Hero = () => {
  useEffect(() => {
    document.body.classList.add("body", "rtl-body");
    document.documentElement.setAttribute("dir", "rtl");
    return () => {
      document.body.classList.remove("body", "rtl-body");
      document.documentElement.removeAttribute("dir");
    };
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "hero-area9", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Row, { className: "align-items-center", children: [
    /* @__PURE__ */ jsx(Col, { lg: 5, children: /* @__PURE__ */ jsxs("div", { className: "main-heading", children: [
      /* @__PURE__ */ jsxs("span", { className: "span", "data-aos": "zoom-in-left", "data-aos-duration": "700", children: [
        /* @__PURE__ */ jsx("img", { src: span, alt: "Span" }),
        " Keep track of your employee data"
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-anime-style-3", children: "Effortless Employee Management For A Growing Businesses" }),
      /* @__PURE__ */ jsx("div", { className: "space16" }),
      /* @__PURE__ */ jsx("p", { children: "Managing your people is easy with Quip HR’s user-friendly and mobile-ready HR software, discover key features via." }),
      /* @__PURE__ */ jsx("div", { className: "space30" }),
      /* @__PURE__ */ jsx("div", { className: "buttons", children: /* @__PURE__ */ jsxs(Link, { to: "/account", className: "theme-btn15", children: [
        "Get quip free now",
        /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaArrowRight, {}) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(Col, { lg: 7, children: /* @__PURE__ */ jsx("div", { className: "main-images", children: heroImages.map((item, idx) => /* @__PURE__ */ jsx("div", { className: item.className, children: /* @__PURE__ */ jsx("img", { src: item.image, alt: `Hero image ${idx + 1}` }) }, idx)) }) })
  ] }) }) });
};
const processItems = [
  {
    title: "Al-Powered Productivity",
    desc: "With an intuitive interface and powerful features, our platform simplifies collaboration, allowing you to effortlessly delegate.",
    image: img1,
    className: "left-top",
    duration: "800",
    col: 6
  },
  {
    title: "View Work Your Way",
    desc: "Team's project management experience. Our robust suite & offers a unified hub an task allocation, collaboration, project.",
    image: img2,
    className: "right-top",
    duration: "1000",
    col: 6
  },
  {
    title: "Search Anythings",
    desc: "With integrated file sharing & version control, your team a access manage",
    image: img3,
    className: "right-top",
    duration: "900",
    col: 4
  },
  {
    title: "Team Collaboration",
    desc: "Our platform brings together task an boards, share calendars, document.",
    image: img4,
    className: "left-bottom",
    duration: "1200",
    col: 4
  },
  {
    title: "Customized In Click",
    desc: "Empower your projects with a holistic workspace solution that a simplifies.",
    image: img5,
    className: "right-bottom",
    duration: "1200",
    col: 4
  }
];
const Process = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "space100" }),
    /* @__PURE__ */ jsx("div", { className: "work-prosess9 sp _relative", id: "work-prosess", children: /* @__PURE__ */ jsxs(Container, { children: [
      /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 7, className: "m-auto text-center", children: /* @__PURE__ */ jsxs("div", { className: "heading9", children: [
        /* @__PURE__ */ jsxs("span", { className: "span", "data-aos": "zoom-in-left", "data-aos-duration": "700", children: [
          /* @__PURE__ */ jsx("img", { src: span, alt: "" }),
          " eSoft Workforce"
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "text-anime-style-3", children: " Empower Of HR Workforce" })
      ] }) }) }),
      /* @__PURE__ */ jsx("div", { className: "space30" }),
      /* @__PURE__ */ jsx(Row, { children: processItems.map((item, idx) => /* @__PURE__ */ jsx(Col, { lg: item.col, children: /* @__PURE__ */ jsx("div", { className: `work-box-area ${item.className}`, children: /* @__PURE__ */ jsxs("div", { className: "single-box", "data-aos": "zoom-in-up", "data-aos-duration": item.duration, children: [
        /* @__PURE__ */ jsxs("div", { className: "heading7", children: [
          /* @__PURE__ */ jsx("h4", { children: /* @__PURE__ */ jsx(Link, { to: "", children: item.title }) }),
          /* @__PURE__ */ jsx("div", { className: "space16" }),
          /* @__PURE__ */ jsx("p", { children: item.desc })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space40" }),
        /* @__PURE__ */ jsx("div", { className: "image", children: /* @__PURE__ */ jsx("img", { src: item.image, alt: item.title }) })
      ] }) }) }, idx)) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "space100" })
  ] });
};
const Solution = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "hr-solutions", id: "hr-solution", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Row, { children: [
    /* @__PURE__ */ jsx(Col, { lg: 7, children: /* @__PURE__ */ jsx("div", { className: "image", children: /* @__PURE__ */ jsx("img", { src: HrImg, alt: "" }) }) }),
    /* @__PURE__ */ jsx(Col, { lg: 5, children: /* @__PURE__ */ jsxs("div", { className: "heading9", children: [
      /* @__PURE__ */ jsxs("span", { className: "span", "data-aos": "zoom-in-left", "data-aos-duration": "700", children: [
        /* @__PURE__ */ jsx("img", { src: span, alt: "" }),
        " HR Solution"
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "text-anime-style-3", children: "Powerful Features For Effective HR Solutions" }),
      /* @__PURE__ */ jsx("div", { className: "space16" }),
      /* @__PURE__ */ jsx("p", { "data-aos": "fade-left", "data-aos-duration": "700", children: "Experience a new level of efficiency with our all-in-one HR software solution. Our intuitive platform is built to simplify your workflow, automating tedious tasks and providing powerful tools for seamless HR management." }),
      /* @__PURE__ */ jsx("div", { className: "space30" }),
      /* @__PURE__ */ jsx("div", { className: "", "data-aos": "fade-left", "data-aos-duration": "1000", children: /* @__PURE__ */ jsxs(Link, { to: "", className: "theme-btn15", children: [
        "Get quip free now",
        /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FaArrowRight, {}) })
      ] }) })
    ] }) })
  ] }) }) }) });
};
const TestimonialData = [
  {
    des: `"I can't imagine managing our email campaigns a without eSoft. The simplicity of creating visually stunning emails combined with powerful automation tools has been a game-changer for our marketing team. Our engagement rates have soared."`,
    image: TestImg,
    logo: Test2Logo1
  },
  {
    des: `"eSoft has exceeded our expectations in every way. The ease with which we can target specific audience segments has an transformed our approach to email marketing. The automation features have saved us countless hours, allowing us to focus"`,
    image: TestImg2,
    logo: Test2Logo2
  },
  {
    des: `"I can't imagine managing our email campaigns a without eSoft. The simplicity of creating visually stunning emails combined with powerful automation tools has been a game-changer for our marketing team. Our engagement rates have soared."`,
    image: TestImg,
    logo: Test2Logo1
  },
  {
    des: `"eSoft has exceeded our expectations in every way. The ease with which we can target specific audience segments has an transformed our approach to email marketing. The automation features have saved us countless hours, allowing us to focus"`,
    image: TestImg2,
    logo: Test2Logo2
  }
];
const Testimonial = () => {
  const setting = {
    slidesToShow: 2,
    margin: 30,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    loop: true,
    rtl: true,
    centerPadding: "40px",
    responsive: [
      {
        breakpoint: 769,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1
        }
      }
    ]
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "tes9 sp", children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsx(Row, { className: "align-items-center", children: /* @__PURE__ */ jsx(Col, { lg: 6, className: "text-center m-auto", children: /* @__PURE__ */ jsxs("div", { className: "heading9", children: [
      /* @__PURE__ */ jsxs("span", { className: "span", "data-aos": "zoom-in-left", "data-aos-duration": "700", children: [
        /* @__PURE__ */ jsx("img", { src: span, alt: "" }),
        " Testimonials"
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "text-anime-style-3", children: "Why Our Users Love Us" })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "space60" }),
    /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 12, children: /* @__PURE__ */ jsx(Slider, { ...setting, className: "tes2-slider-all-rtl", "data-aos": "fade-up", "data-aos-duration": "900", children: TestimonialData.map((item, idx) => /* @__PURE__ */ jsx("div", { className: "px-1", children: /* @__PURE__ */ jsxs("div", { className: "single-slider", children: [
      /* @__PURE__ */ jsxs("ul", { className: "stars", children: [
        /* @__PURE__ */ jsx("li", { style: { marginRight: "5px" }, children: /* @__PURE__ */ jsx(FaStar, {}) }),
        /* @__PURE__ */ jsx("li", { style: { marginRight: "5px" }, children: /* @__PURE__ */ jsx(FaStar, {}) }),
        /* @__PURE__ */ jsx("li", { style: { marginRight: "5px" }, children: /* @__PURE__ */ jsx(FaStar, {}) }),
        /* @__PURE__ */ jsx("li", { style: { marginRight: "5px" }, children: /* @__PURE__ */ jsx(FaStar, {}) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(FaStar, {}) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "icon", children: /* @__PURE__ */ jsx("img", { src: TestIcon, alt: "" }) }),
      /* @__PURE__ */ jsx("p", { children: item.des }),
      /* @__PURE__ */ jsxs("div", { className: "single-slider-bottom", children: [
        /* @__PURE__ */ jsxs("div", { className: "headdding-area", children: [
          /* @__PURE__ */ jsx("div", { className: "image", children: /* @__PURE__ */ jsx("img", { src: item.image, alt: "" }) }),
          /* @__PURE__ */ jsxs("div", { className: "headding", children: [
            /* @__PURE__ */ jsx("h5", { children: /* @__PURE__ */ jsx(Link, { to: "", children: "Pat Cummins" }) }),
            /* @__PURE__ */ jsx("p", { children: "Ceo Biosynthesis" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "logo", children: /* @__PURE__ */ jsx("img", { src: item.logo, alt: "" }) })
      ] })
    ] }, idx) })) }) }) })
  ] }) }) });
};
const tabContents = [
  { title: "Create Engaging Campaigns", image: workImg1, duration: "800" },
  { title: "Automate Workflows", image: workImg2, duration: "1000" },
  { title: "Grow Your Reach", image: workImg3, duration: "1100" }
];
const Work = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "space100" }),
    /* @__PURE__ */ jsxs("div", { className: "work2 _relative", id: "work", children: [
      /* @__PURE__ */ jsxs(Container, { children: [
        /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 6, className: "m-auto text-center", children: /* @__PURE__ */ jsxs("div", { className: "heading9", children: [
          /* @__PURE__ */ jsxs("span", { className: "span", "data-aos": "zoom-in-left", "data-aos-duration": "700", children: [
            /* @__PURE__ */ jsx("img", { src: span, alt: "" }),
            " Keep track of your employee data"
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "text-anime-style-3", children: "HRMS Software Will Be Your Organization Data Warehouse" })
        ] }) }) }),
        /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 9, className: "m-auto text-center", children: /* @__PURE__ */ jsx("ul", { className: "nav nav-pills mb-3", id: "pills-tab", role: "tablist", children: [1, 2, 3].map((num) => /* @__PURE__ */ jsx("li", { className: "nav-item", role: "presentation", children: /* @__PURE__ */ jsx(
          "button",
          {
            className: `nav-link${activeTab === `tab${num}` ? " active" : ""}`,
            id: `tab${num}-tab`,
            type: "button",
            role: "tab",
            "aria-controls": `tab${num}`,
            "aria-selected": activeTab === `tab${num}`,
            onClick: () => setActiveTab(`tab${num}`),
            children: num
          }
        ) }, num)) }) }) }),
        /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Col, { lg: 12, children: /* @__PURE__ */ jsx(Tab.Container, { activeKey: activeTab, children: /* @__PURE__ */ jsx(Tab.Content, { children: [1, 2, 3].map((tabIndex) => /* @__PURE__ */ jsx(Tab.Pane, { eventKey: `tab${tabIndex}`, id: `tab${tabIndex}`, children: /* @__PURE__ */ jsx(Row, { children: tabContents.map((item, i) => /* @__PURE__ */ jsx(Col, { lg: 4, children: /* @__PURE__ */ jsxs("div", { className: "tabs-box-item", "data-aos": "fade-up", "data-aos-duration": item.duration || "800", children: [
          /* @__PURE__ */ jsx("h3", { children: item.title }),
          /* @__PURE__ */ jsx("img", { src: item.image, alt: item.title })
        ] }) }, i)) }) }, tabIndex)) }) }) }) })
      ] }),
      /* @__PURE__ */ jsx("img", { className: "shape1", src: shape1, alt: "shape1" }),
      /* @__PURE__ */ jsx("img", { className: "shape2", src: shape2, alt: "shape2" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space40" })
  ] });
};
const meta = () => {
  return [{ title: "Web Page Builder" }];
};
const rtl = () => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(BasicLayout, { children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx(Hero, {}),
    /* @__PURE__ */ jsx(Work, {}),
    /* @__PURE__ */ jsx(Counter, {}),
    /* @__PURE__ */ jsx(Process, {}),
    /* @__PURE__ */ jsx(Benefit, {}),
    /* @__PURE__ */ jsx(Solution, {}),
    /* @__PURE__ */ jsx(Testimonial, {}),
    /* @__PURE__ */ jsx(CTA, {}),
    /* @__PURE__ */ jsx(Footer$1, {})
  ] }) });
};
const route21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: rtl,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-oGa7lyaH.js", "imports": ["/assets/components-Dfbk34rr.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-D6kjPNPF.js", "imports": ["/assets/components-Dfbk34rr.js", "/assets/index-CTYhnPhw.js"], "css": ["/assets/root-BQ7hRycN.css"] }, "routes/blog-details-sidebar-right": { "id": "routes/blog-details-sidebar-right", "parentId": "root", "path": "blog-details-sidebar-right", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-hAnl_3XR.js", "imports": ["/assets/components-Dfbk34rr.js", "/assets/MainLayout-wEScm6wH.js", "/assets/Row-fsFU_NsL.js", "/assets/index-CTYhnPhw.js", "/assets/MobileMenu-BgW_Kcis.js", "/assets/CurrentYear-B8PUG0sP.js", "/assets/index-BOvzG7U2.js"], "css": [] }, "routes/blog-details-sidebar-left": { "id": "routes/blog-details-sidebar-left", "parentId": "root", "path": "blog-details-sidebar-left", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-B5R0VPgy.js", "imports": ["/assets/components-Dfbk34rr.js", "/assets/MainLayout-wEScm6wH.js", "/assets/Row-fsFU_NsL.js", "/assets/index-CTYhnPhw.js", "/assets/MobileMenu-BgW_Kcis.js", "/assets/CurrentYear-B8PUG0sP.js", "/assets/index-BOvzG7U2.js"], "css": [] }, "routes/blog-details": { "id": "routes/blog-details", "parentId": "root", "path": "blog-details", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-BH0tQkDj.js", "imports": ["/assets/components-Dfbk34rr.js", "/assets/MainLayout-wEScm6wH.js", "/assets/index-CTYhnPhw.js", "/assets/Row-fsFU_NsL.js", "/assets/MobileMenu-BgW_Kcis.js", "/assets/CurrentYear-B8PUG0sP.js", "/assets/index-BOvzG7U2.js"], "css": [] }, "routes/form-success": { "id": "routes/form-success", "parentId": "root", "path": "form-success", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-KPJQ9cdK.js", "imports": ["/assets/components-Dfbk34rr.js", "/assets/Row-fsFU_NsL.js"], "css": [] }, "routes/testimonial": { "id": "routes/testimonial", "parentId": "root", "path": "testimonial", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-x5IchT_h.js", "imports": ["/assets/components-Dfbk34rr.js", "/assets/MainLayout-wEScm6wH.js", "/assets/Pagination-C79sENL3.js", "/assets/index-CTYhnPhw.js", "/assets/index-DiW_cNtZ.js", "/assets/Row-fsFU_NsL.js", "/assets/MobileMenu-BgW_Kcis.js", "/assets/CurrentYear-B8PUG0sP.js", "/assets/index-BOvzG7U2.js"], "css": [] }, "routes/single.rtl": { "id": "routes/single.rtl", "parentId": "root", "path": "single/rtl", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-B0vcciry.js", "imports": ["/assets/components-Dfbk34rr.js", "/assets/index-BOvzG7U2.js", "/assets/work2-img3-BCQq4Gre.js", "/assets/Row-fsFU_NsL.js", "/assets/preload-helper-ckwbz45p.js", "/assets/index-CTYhnPhw.js", "/assets/index-DiW_cNtZ.js", "/assets/Tab-N4r7NQIA.js", "/assets/CurrentYear-B8PUG0sP.js", "/assets/index-Dcr0aEnq.js", "/assets/TransitionWrapper-kzuSGgYg.js"], "css": [] }, "routes/download": { "id": "routes/download", "parentId": "root", "path": "download", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-9boz3Ov5.js", "imports": ["/assets/components-Dfbk34rr.js", "/assets/MainLayout-wEScm6wH.js", "/assets/Row-fsFU_NsL.js", "/assets/MobileMenu-BgW_Kcis.js", "/assets/CurrentYear-B8PUG0sP.js", "/assets/index-CTYhnPhw.js", "/assets/index-BOvzG7U2.js"], "css": [] }, "routes/features": { "id": "routes/features", "parentId": "root", "path": "features", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-B3CflHCI.js", "imports": ["/assets/components-Dfbk34rr.js", "/assets/MainLayout-wEScm6wH.js", "/assets/About3-BelUDoWk.js", "/assets/Innovation-BQSZmiI0.js", "/assets/Row-fsFU_NsL.js", "/assets/index-CTYhnPhw.js", "/assets/Tab-N4r7NQIA.js", "/assets/MobileMenu-BgW_Kcis.js", "/assets/CurrentYear-B8PUG0sP.js", "/assets/index-BOvzG7U2.js", "/assets/index-Dcr0aEnq.js", "/assets/TransitionWrapper-kzuSGgYg.js"], "css": [] }, "routes/account": { "id": "routes/account", "parentId": "root", "path": "account", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-kxSFSUmi.js", "imports": ["/assets/components-Dfbk34rr.js", "/assets/Row-fsFU_NsL.js", "/assets/Form-pc-nTZ_b.js", "/assets/index-Dcr0aEnq.js"], "css": [] }, "routes/contact": { "id": "routes/contact", "parentId": "root", "path": "contact", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-Dz7MvlHL.js", "imports": ["/assets/components-Dfbk34rr.js", "/assets/MainLayout-wEScm6wH.js", "/assets/Row-fsFU_NsL.js", "/assets/MobileMenu-BgW_Kcis.js", "/assets/CurrentYear-B8PUG0sP.js", "/assets/index-CTYhnPhw.js", "/assets/index-BOvzG7U2.js"], "css": [] }, "routes/pricing": { "id": "routes/pricing", "parentId": "root", "path": "pricing", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-BZ48-pBg.js", "imports": ["/assets/components-Dfbk34rr.js", "/assets/MainLayout-wEScm6wH.js", "/assets/Row-fsFU_NsL.js", "/assets/index-CTYhnPhw.js", "/assets/MobileMenu-BgW_Kcis.js", "/assets/CurrentYear-B8PUG0sP.js", "/assets/index-BOvzG7U2.js"], "css": [] }, "routes/forgot": { "id": "routes/forgot", "parentId": "root", "path": "forgot", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-BtjEzbY5.js", "imports": ["/assets/components-Dfbk34rr.js", "/assets/Row-fsFU_NsL.js", "/assets/Form-pc-nTZ_b.js", "/assets/index-Dcr0aEnq.js"], "css": [] }, "routes/home-1": { "id": "routes/home-1", "parentId": "root", "path": "home-1", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-DB1-dQ4f.js", "imports": ["/assets/components-Dfbk34rr.js", "/assets/BasicLayout-CA8Ujs44.js", "/assets/index-CTYhnPhw.js", "/assets/Row-fsFU_NsL.js", "/assets/preload-helper-ckwbz45p.js", "/assets/TransitionWrapper-kzuSGgYg.js", "/assets/CurrentYear-B8PUG0sP.js", "/assets/MobileMenu-BgW_Kcis.js"], "css": [] }, "routes/verify": { "id": "routes/verify", "parentId": "root", "path": "verify", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-CdM93IeV.js", "imports": ["/assets/components-Dfbk34rr.js", "/assets/Row-fsFU_NsL.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-C6d-v1ok.js", "imports": [], "css": [] }, "routes/about": { "id": "routes/about", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-D1cJjZ-U.js", "imports": ["/assets/components-Dfbk34rr.js", "/assets/MainLayout-wEScm6wH.js", "/assets/preload-helper-ckwbz45p.js", "/assets/Row-fsFU_NsL.js", "/assets/index-CTYhnPhw.js", "/assets/About3-BelUDoWk.js", "/assets/Innovation-BQSZmiI0.js", "/assets/MobileMenu-BgW_Kcis.js", "/assets/CurrentYear-B8PUG0sP.js", "/assets/index-BOvzG7U2.js"], "css": [] }, "routes/error": { "id": "routes/error", "parentId": "root", "path": "error", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-BvTJwdC9.js", "imports": ["/assets/components-Dfbk34rr.js", "/assets/Row-fsFU_NsL.js"], "css": [] }, "routes/login": { "id": "routes/login", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-Az-REbbo.js", "imports": ["/assets/components-Dfbk34rr.js", "/assets/Row-fsFU_NsL.js", "/assets/Form-pc-nTZ_b.js", "/assets/index-Dcr0aEnq.js"], "css": [] }, "routes/reset": { "id": "routes/reset", "parentId": "root", "path": "reset", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-ncakjZKU.js", "imports": ["/assets/components-Dfbk34rr.js", "/assets/Row-fsFU_NsL.js", "/assets/Form-pc-nTZ_b.js", "/assets/index-Dcr0aEnq.js"], "css": [] }, "routes/blog": { "id": "routes/blog", "parentId": "root", "path": "blog", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-BJA2n9uH.js", "imports": ["/assets/components-Dfbk34rr.js", "/assets/MainLayout-wEScm6wH.js", "/assets/Innovation-BQSZmiI0.js", "/assets/index-CTYhnPhw.js", "/assets/Row-fsFU_NsL.js", "/assets/Pagination-C79sENL3.js", "/assets/MobileMenu-BgW_Kcis.js", "/assets/CurrentYear-B8PUG0sP.js", "/assets/index-BOvzG7U2.js"], "css": [] }, "routes/rtl": { "id": "routes/rtl", "parentId": "root", "path": "rtl", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-bEc_aL69.js", "imports": ["/assets/components-Dfbk34rr.js", "/assets/BasicLayout-CA8Ujs44.js", "/assets/index-BOvzG7U2.js", "/assets/work2-img3-BCQq4Gre.js", "/assets/Row-fsFU_NsL.js", "/assets/preload-helper-ckwbz45p.js", "/assets/MobileMenu-BgW_Kcis.js", "/assets/index-CTYhnPhw.js", "/assets/index-DiW_cNtZ.js", "/assets/Tab-N4r7NQIA.js", "/assets/CurrentYear-B8PUG0sP.js", "/assets/index-Dcr0aEnq.js", "/assets/TransitionWrapper-kzuSGgYg.js"], "css": [] } }, "url": "/assets/manifest-fc225deb.js", "version": "fc225deb" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": true, "v3_lazyRouteDiscovery": true, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/blog-details-sidebar-right": {
    id: "routes/blog-details-sidebar-right",
    parentId: "root",
    path: "blog-details-sidebar-right",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/blog-details-sidebar-left": {
    id: "routes/blog-details-sidebar-left",
    parentId: "root",
    path: "blog-details-sidebar-left",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/blog-details": {
    id: "routes/blog-details",
    parentId: "root",
    path: "blog-details",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/form-success": {
    id: "routes/form-success",
    parentId: "root",
    path: "form-success",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/testimonial": {
    id: "routes/testimonial",
    parentId: "root",
    path: "testimonial",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/single.rtl": {
    id: "routes/single.rtl",
    parentId: "root",
    path: "single/rtl",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/download": {
    id: "routes/download",
    parentId: "root",
    path: "download",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/features": {
    id: "routes/features",
    parentId: "root",
    path: "features",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/account": {
    id: "routes/account",
    parentId: "root",
    path: "account",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/contact": {
    id: "routes/contact",
    parentId: "root",
    path: "contact",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/pricing": {
    id: "routes/pricing",
    parentId: "root",
    path: "pricing",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "routes/forgot": {
    id: "routes/forgot",
    parentId: "root",
    path: "forgot",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "routes/home-1": {
    id: "routes/home-1",
    parentId: "root",
    path: "home-1",
    index: void 0,
    caseSensitive: void 0,
    module: route13
  },
  "routes/verify": {
    id: "routes/verify",
    parentId: "root",
    path: "verify",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route15
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route16
  },
  "routes/error": {
    id: "routes/error",
    parentId: "root",
    path: "error",
    index: void 0,
    caseSensitive: void 0,
    module: route17
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route18
  },
  "routes/reset": {
    id: "routes/reset",
    parentId: "root",
    path: "reset",
    index: void 0,
    caseSensitive: void 0,
    module: route19
  },
  "routes/blog": {
    id: "routes/blog",
    parentId: "root",
    path: "blog",
    index: void 0,
    caseSensitive: void 0,
    module: route20
  },
  "routes/rtl": {
    id: "routes/rtl",
    parentId: "root",
    path: "rtl",
    index: void 0,
    caseSensitive: void 0,
    module: route21
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
