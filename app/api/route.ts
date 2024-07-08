import { writeFile } from "fs/promises";

export async function GET(request: Request) {
  return Response.json({ message: "hello world" });
}

export async function POST(request: Request) {
  const data = await request.formData();
  const formDataValueList = Array.from(data.values());

  const writeFilePromiseList: Promise<void>[] = [];
  for (const formDataValue of formDataValueList) {
    if (typeof formDataValue === "object" && "arrayBuffer" in formDataValue) {
      const file = formDataValue as unknown as File;
      const buffer = Buffer.from(await file.arrayBuffer());
      const path = `${process.cwd()}/public/upload/${file.name}`;
      writeFilePromiseList.push(writeFile(path, buffer));
    }
  }

  try {
    await Promise.all(writeFilePromiseList);

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false });
  }
}
