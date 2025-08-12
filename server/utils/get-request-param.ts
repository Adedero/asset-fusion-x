import type { EventHandlerRequest, H3Event } from "h3";

function getRequestParam(
  event: H3Event<EventHandlerRequest>,
  name: string,
): string;
function getRequestParam(
  event: H3Event<EventHandlerRequest>,
  name: string,
  force?: boolean,
): string | undefined {
  const param = getRouterParam(event, name);
  const shouldForce = force !== false;
  if (!shouldForce) return param;
  if (!param) {
    throw createError({
      statusCode: 400,
      statusMessage: `Missing required param: ${name}`,
    });
  }
  return param;
}

export default getRequestParam;
