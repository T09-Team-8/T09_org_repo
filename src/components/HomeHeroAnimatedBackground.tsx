// import { useEffect, useState } from "react";
// import { ShaderFill } from "../lib/custom-effect-runtime";
// import {
//   manifest,
//   render,
//   setup,
// } from "../lib/custom-effects/CodeComponentId_8ce92017e53431a2f04b3574f4ba7c98f6f55f1e_8358";

// type HomeHeroAnimatedBackgroundProps = {
//   className?: string;
// };

// const shader = {
//   setup,
//   render,
//   manifest,
//   params: {
//     intensity: 1.9199999570846558,
//     gradient: {
//       stops: [
//         {
//           position: 0,
//           color: {
//             r: 0.95686274766922,
//             g: 0.9411764740943909,
//             b: 0.5647059082984924,
//             a: 1,
//           },
//         },
//         {
//           position: 0.25,
//           color: {
//             r: 0.8627451062202454,
//             g: 0.9313725233078003,
//             b: 0.9215686321258545,
//             a: 1,
//           },
//         },
//         {
//           position: 0.5,
//           color: {
//             r: 0.9607843160629272,
//             g: 0.9411764740943909,
//             b: 0.8784313797950745,
//             a: 1,
//           },
//         },
//         {
//           position: 1,
//           color: {
//             r: 0.23529411852359772,
//             g: 0.16470588743686676,
//             b: 0.16470588743686676,
//             a: 1,
//           },
//         },
//       ],
//     },
//     gradientBalance: -28,
//     material: 2,
//     morphSpeed: 2.759999990463257,
//     detail: 1.5099999904632568,
//     twist: 0.2199999988079071,
//     zoom: 63,
//     gradientMethod: 0,
//     warp: 0.4699999988079071,
//     rotationSpeed: 26,
//   },
// };

// export default function HomeHeroAnimatedBackground({
//   className = "",
// }: HomeHeroAnimatedBackgroundProps) {
//   const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

//   useEffect(() => {
//     const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
//     const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

//     updatePreference();
//     mediaQuery.addEventListener("change", updatePreference);
//     return () => mediaQuery.removeEventListener("change", updatePreference);
//   }, []);

//   return (
//     <div
//       className={`home-hero__animated-background ${className}`.trim()}
//       data-node-id="1:4"
//       aria-hidden="true"
//     >
//       {!prefersReducedMotion && (
//         <ShaderFill
//           className="home-hero__animated-background-shader"
//           style={{ opacity: 0.9 }}
//           shader={shader}
//         />
//       )}
//     </div>
//   );
// }
