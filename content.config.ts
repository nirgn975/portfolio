import { defineCollection, z } from "@nuxt/content";

export const collections = {
  posts: defineCollection({
    type: "page",
    source: "blog/**/*",
    schema: z.object({
      title: z.string().nonempty(),
      description: z.string().nonempty(),
      image: z.object({ src: z.string().nonempty() }),
      author: z.object({
        name: z.string().nonempty(),
        to: z.string().nonempty(),
        avatar: z.object({ src: z.string().nonempty() }),
      }),
      date: z.date(),
      badge: z.object({ label: z.string().nonempty() }),
      draft: z.boolean().default(false),
    }),
  }),
  index: defineCollection({
    source: "index.yml",
    type: "data",
    schema: z.object({
      title: z.string().nonempty(),
      description: z.string().nonempty(),
      hero: z.object({
        title: z.string().nonempty(),
        description: z.string().nonempty(),
      }),
      projects: z.array(
        z.object({
          title: z.string().nonempty(),
          description: z.string().nonempty(),
          to: z.string().nonempty(),
          target: z.string().nonempty(),
          icon: z.string().nonempty(),
          img: z.string().nonempty(),
          class: z.string().nonempty(),
        })
      ),
    }),
  }),
  about: defineCollection({
    source: "about.yml",
    type: "data",
    schema: z.object({
      title: z.string().nonempty(),
      description: z.string().nonempty(),
      aboutMe: z.object({
        title: z.string().nonempty(),
        icon: z.string().nonempty(),
        description: z.string().nonempty(),
        items: z.array(z.string().nonempty()),
      }),
      work: z.object({
        title: z.string().nonempty(),
        icon: z.string().nonempty(),
        items: z.array(
          z.object({
            start_date: z.string().nonempty(),
            end_date: z.string().nonempty(),
            title: z.string().nonempty(),
            company: z.object({
              name: z.string().nonempty(),
              url: z.string().nonempty(),
            }),
            items: z.array(z.string().nonempty()),
          })
        ),
      }),
      education: z.object({
        title: z.string(),
        icon: z.string(),
        items: z.array(
          z.object({
            start_date: z.string().nonempty(),
            end_date: z.string().nonempty(),
            title: z.string().nonempty(),
            university: z.object({
              name: z.string().nonempty(),
              url: z.string().nonempty(),
            }),
            items: z.array(z.string().nonempty()),
          })
        ),
      }),
      skills: z.object({
        title: z.string().nonempty(),
        icon: z.string().nonempty(),
        items: z.array(
          z.object({
            title: z.string(),
            items: z.array(
              z.object({
                name: z.string().nonempty(),
                icon: z.string().nonempty(),
              })
            ),
          })
        ),
      }),
      projects: z.object({
        title: z.string().nonempty(),
        icon: z.string().nonempty(),
        items: z.array(
          z.object({
            code: z.string().nonempty(),
            title: z.string().nonempty(),
          })
        ),
      }),
      talks: z.object({
        title: z.string().nonempty(),
        icon: z.string().nonempty(),
        items: z.array(
          z.object({
            future: z.boolean(),
            image: z.string().nonempty(),
            title: z.string().nonempty(),
            date: z.string().nonempty(),
            meetup_url: z.string().nonempty(),
            download_url: z.string().nonempty(),
          })
        ),
      }),
    }),
  }),
  blog: defineCollection({
    source: "blog.yml",
    type: "data",
    schema: z.object({
      title: z.string().nonempty(),
      description: z.string().nonempty(),
    }),
  }),
};
