"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

gsap.config({
  force3D: true,
});

ScrollTrigger.config({
  limitCallbacks: true,
  ignoreMobileResize: true,
});

export { gsap, ScrollTrigger, useGSAP };
