import { FC, ReactNode } from 'react';

type Props = JSX.IntrinsicElements['button'] & {
  children: ReactNode;
};

export const Button: FC<Props> = ({ children }, ...rest) => {
  return (
    <button className='' {...rest}>
      {children}
    </button>
  );
};
