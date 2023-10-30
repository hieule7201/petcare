const InputForm = ({ action, method, children, onSubmit }) => {
  return (
    <form
      action={action}
      method={method}
      className="input-form"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export default InputForm;
