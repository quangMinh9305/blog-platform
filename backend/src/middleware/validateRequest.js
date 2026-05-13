// This function is to validate the input sent by client
// This function is used for specific routes, not for all (depends on decision of developer) -> as an parameter in `router.post(<route>, <validate(<schema>)>, <controller-function>)

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errMessages = result.error.errors.map((err) => err.message);
      const err = errMessages.join(",");
      return res.status(400).json({ message: err });
    }

    next();
  };
};
