import {
  Response,
  Request,
  Body,
} from "https://deno.land/x/oak/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

interface User {
  id: String;
  name: String;
}
let users: User[] = [
  {
    id: "1",
    name: "Jopee",
  },
];

export const getUsers = ({ response }: { response: Response }) => {
  response.body = {
    message: "Successful query!",
    users,
  };
};
export const getUser = (
  { params, response }: { response: Response; params: { id: string } },
) => {
  const user = users.find((usr) => usr.id === params.id);
  if (!user) {
    response.status = 404;
    response.body = {
      message: "User not found",
    };
  } else {
    response.status = 200;
    response.body = {
      user,
    };
  }
};

export const createUser = async (
  { request, response }: { response: Response; request: Request },
) => {
  const body: Body = await request.body();

  if (!request.hasBody) {
    response.status = 404;
    response.body = {
      message: "Name is required",
    };
  } else {
    const newUser: User = body.value;
    newUser.id = v4.generate();

    users.push(newUser);

    response.status = 201;
    response.body = {
      message: "User created",
      user: newUser,
    };
  }
};
export const updateUser = async (
  { params, response, request }: {
    response: Response;
    params: { id: string };
    request: Request;
  },
) => {
  const body: Body = await request.body();

  if (!request.hasBody) {
    response.status = 404;
    response.body = {
      message: "Nothing to change",
    };
  } else {
    const user = users.find((usr) => usr.id === params.id);

    if (!user) {
      response.status = 404;
      response.body = {
        message: "User not found",
      };
    } else {
      const updatedUser = body.value;

      users = users.map((usr) =>
        usr.id === params.id ? { ...usr, ...updatedUser } : usr
      );

      response.status = 200;
      response.body = {
        message: "User updated",
        users,
      };
    }
  }
};
export const deleteUser = (
  { params, response }: { response: Response; params: { id: string } },
) => {
  users = users.filter((usr) => usr.id !== params.id);
  response.status = 204;
  response.body = {
    message: "User Deleted",
    users,
  };
};
