import { createClient } from "redis";

export const client = createClient({
    name: "default",
    password: "ujJqOFGgG6MrmZQntfUa2Ymcqe0iT38m",
    socket: {
        host: "redis-17935.crce206.ap-south-1-1.ec2.cloud.redislabs.com",
        port: 17935
    }
});

client.on("error", err => console.log(`Redis Error: ${err}`));