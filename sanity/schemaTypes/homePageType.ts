import {defineArrayMember, defineField, defineType} from 'sanity'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'kicker',
      title: 'Kicker',
      type: 'string',
      description: 'Short line above the headline',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'primaryCtaLabel',
      title: 'Primary CTA Label',
      type: 'string',
    }),
    defineField({
      name: 'primaryCtaHref',
      title: 'Primary CTA Link',
      type: 'string',
    }),
    defineField({
      name: 'secondaryCtaLabel',
      title: 'Secondary CTA Label',
      type: 'string',
    }),
    defineField({
      name: 'secondaryCtaHref',
      title: 'Secondary CTA Link',
      type: 'string',
    }),
    defineField({
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', type: 'string', title: 'Label'}),
            defineField({name: 'value', type: 'string', title: 'Value'}),
          ],
        }),
      ],
    }),
    defineField({
      name: 'pillars',
      title: 'Pillars',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'string', title: 'Title'}),
            defineField({name: 'description', type: 'text', title: 'Description'}),
          ],
        }),
      ],
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'question', type: 'string', title: 'Question'}),
            defineField({name: 'answer', type: 'text', title: 'Answer'}),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Home Page'}
    },
  },
})
