import { Response, Request } from "express"

const getHome = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(201).send(`
      <h1>Welcome to Brezaa Backend server! Awesome right</h1>

      <h2>
        <p>Dont know where to go?</p>
        <a href='/api-docs'>View the Docs</a>
      </h2>
      `);
  } catch (error) {
    throw error
  }
}

export { getHome }
