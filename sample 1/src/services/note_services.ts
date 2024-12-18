import { Note } from "../types/note.ts";

export class NotesService {
  private notesDirectory: string;

  constructor(notesDir: string = "./notes") {
    this.notesDirectory = notesDir;

    // Ensure notes directory exists
    try {
      Deno.mkdirSync(this.notesDirectory, { recursive: true });
    } catch (err) {
      console.error("Failed to create notes directory:", err);
    }
  }

  async createNote(request: Request) {
    try {
      // Parse the request body
      const { title, content } = (await request.json()) as Note;

      // Sanitize filename to remove invalid characters
      const sanitizedTitle = title.replace(/[^a-z0-9]/gi, "_").toLowerCase();
      const filePath = `${this.notesDirectory}/${sanitizedTitle}.txt`;

      // Write the note content to file
      await Deno.writeTextFile(filePath, content);

      // Return successful response
      return new Response(
        JSON.stringify({
          message: "Note created successfully",
          filename: `${sanitizedTitle}.txt`,
        }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      // Handle potential errors
      return new Response(
        JSON.stringify({
          message: "Failed to create note",
          error: error instanceof Error ? error.message : "Unknown error",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }

  async getAllNotes() {
    try {
      // Read all files in the notes directory
      const files = Array.from(Deno.readDirSync(this.notesDirectory))
        .filter((file) => file.isFile && file.name.endsWith(".txt"))
        .map((file) => file.name);

      // Read contents of each note
      const notes = await Promise.all(
        files.map(async (filename) => {
          const filePath = `${this.notesDirectory}/${filename}`;
          const content = await Deno.readTextFile(filePath);

          return {
            title: filename.replace(".txt", ""),
            content: content,
          };
        })
      );

      // Send notes as JSON response
      return new Response(JSON.stringify(notes), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      // Handle potential errors
      return new Response(
        JSON.stringify({
          message: "Failed to retrieve notes",
          error: error instanceof Error ? error.message : "Unknown error",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }
}
