type IfComponentProps = {
  children: JSX.Element;
  condition: boolean;
};

export function IF({ children, condition }: IfComponentProps) {
  if (condition) {
    return children;
  }

  return null;
}
