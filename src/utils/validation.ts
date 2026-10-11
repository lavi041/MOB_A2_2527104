export type ProfileForm = {
  headline: string;
  bio: string;
  primarySkill: string;
  availability: string;
};

export type FormErrors = Partial<Record<keyof ProfileForm, string>>;

export function validateProfile(form: ProfileForm): FormErrors {
  const errors: FormErrors = {};
  const headline = form.headline.trim();
  const bio = form.bio.trim();
  const skill = form.primarySkill.trim();
  const availability = form.availability.trim();

  // Rule 1: required fields
  if (!headline) errors.headline = 'Headline is required.';
  if (!bio) errors.bio = 'Biography is required.';
  if (!skill) errors.primarySkill = 'Primary skill is required.';
  if (!availability) errors.availability = 'Availability status is required.';

  // Rule 2: minimum and maximum lengths
  if (headline && headline.length < 5) errors.headline = 'Headline must be at least 5 characters.';
  else if (headline.length > 60) errors.headline = 'Headline must be 60 characters or fewer.';
  if (bio && bio.length < 30) errors.bio = 'Biography must be at least 30 characters.';
  else if (bio.length > 300) errors.bio = 'Biography must be 300 characters or fewer.';
  if (availability.length > 40) errors.availability = 'Availability must be 40 characters or fewer.';

  // Rule 3: primary skill format
  if (skill && !/^[A-Za-z][A-Za-z0-9 .+#/-]{1,29}$/.test(skill)) {
    errors.primarySkill =
      'Use 2 to 30 characters, starting with a letter (letters, numbers, space, . + # / - only).';
  }

  return errors;
}
