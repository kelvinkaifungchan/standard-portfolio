import matter from "gray-matter";

// Markdown processing
import { remark } from "remark";
import html from "remark-html";

// Modules
import { listS3Objects, getS3ObjectContent } from "./s3";

// Types
const bucketName = process.env.S3_BUCKET_NAME;

export async function getProjects(code: string) {
  try {
    if (!bucketName) {
      throw new Error("S3 bucket name is undefined.");
    }
    const s3Objects = await listS3Objects(bucketName, code);

    //Filter response
    const projects = new Set<string>();
    for (const key of s3Objects) {
      // Check if key is defined and not empty
      if (key && key.length > 0) {
        // Split the key into segments using '/'
        const segments = key.split("/");

        // Check if the key represents a subfolder (not a file)
        if (segments.length > 1) {
          // The first segment is the top-level folder, which is "posts/" in this case.
          // The second segment is the subfolder name.
          projects.add(segments[1].replace(".md", ""));
        }
      }
    }

    // Convert the Set back to an array
    const filteredProjects = Array.from(projects).filter(
      (project) => project.length > 0
    );

    const allProjectsData = await Promise.all(
      filteredProjects.map(async (project) => {
        if (!project) {
          return null;
        }
        const data = getProjectData(
          code,
          project.replace(/\s/g, "").toLowerCase()
        );

        return data;
      })
    );
    return allProjectsData;
  } catch (error) {
    throw error;
  }
}

function findIndexInS3Array(
  s3Array: string[],
  code: string,
  name: string
): number {
  const fullId = code + "/" + name + ".md";
  // Use Array.findIndex to find the index of the element in the array
  const index = s3Array.findIndex(
    (element) => element.replace(/\s/g, "").toLowerCase() === fullId
  );

  return index;
}

export async function getProjectData(code: string, name: string) {
  if (!bucketName) {
    throw new Error("S3 bucket name is undefined.");
  }
  try {
    const s3Objects = await listS3Objects(bucketName);
    if (!s3Objects[0]) {
      throw new Error("Error fetching S3 object.");
    }
    // Use type assertion to handle the potential undefined values
    const filteredS3Objects = s3Objects.filter(
      (obj): obj is string => typeof obj === "string"
    );

    if (!filteredS3Objects[0]) {
      throw new Error("Error fetching S3 object.");
    }
    const fileIndex = findIndexInS3Array(filteredS3Objects, code, name);
    if (fileIndex === -1) {
      throw new Error("File not found.");
    }

    const fileContents = await getS3ObjectContent(
      bucketName,
      filteredS3Objects[fileIndex]
    );
    if (typeof fileContents !== "string") {
      // Skip and return nothing if fileContents is not a valid string
      throw new Error("Error fetching S3 object.");
    }
    //Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    //Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(matterResult.content);

    const contentHtml = processedContent.toString();

    //Combine the data with the id
    const post = {
      id: name,
      name: matterResult.data.name,
      date: matterResult.data.date,
      description: matterResult.data.description,
      location: matterResult.data.location,
      media: matterResult.data.media,
      contentHtml,
    };

    return post;
  } catch (error) {
    throw error;
  }
}
