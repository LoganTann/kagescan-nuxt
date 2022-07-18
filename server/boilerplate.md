
```ts
import { defineHandler, IncomingMessage } from "h3";
import { serverSupabaseServiceRole } from "#supabase/server";

export default defineHandler(async (event: IncomingMessage) => {
    // ${event.context.params.id}
    //const client = serverSupabaseServiceRole(event);
    return {message: "Hello World"};
});
```