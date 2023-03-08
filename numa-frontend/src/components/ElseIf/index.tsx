export function ElseIf({ children, condition, elseComponent }: ElseIfProps) {
  if (condition) {
    return children;
  }

  return elseComponent;
}
