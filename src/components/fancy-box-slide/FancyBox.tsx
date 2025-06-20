import { useRef, useEffect, type PropsWithChildren } from "react";

import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import { type OptionsType } from "@fancyapps/ui/types/Fancybox/options";

//fancybox props
interface PancyBoxProps {
  options?: Partial<OptionsType>;
  delegate?: string;
}

function Fancybox(props: PropsWithChildren<PancyBoxProps>) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const delegate = props.delegate || "[data-fancybox]";
    const options = props.options || {};

    NativeFancybox.bind(container, delegate, options);

    return () => {
      NativeFancybox.unbind(container);
      NativeFancybox.close();
    };
  });

  return <div ref={containerRef}>{props.children}</div>;
}

export default Fancybox;
