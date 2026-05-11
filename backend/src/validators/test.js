// This file is used to define the validate schema of the request
// Each parameter in the request must satisfy the pre-defined conditions

import { z } from "zod";

const testSchema = z.object({
  movieId: z.string().uuid(),
  status: z
    .enum(
      [
        // pass those values defined-enum
      ],
      {
        error: () => ({
          message: "Status must be one of: [<defined-values>]",
        }),
      },
    )
    .optional(),
  rating: z.int(),
});
