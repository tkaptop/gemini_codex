export interface PromptsPage {
  metadata: {
    title: string;
    description: string;
    keywords?: string;
  };
  hero: {
    title: string;
    description: string;
  };
  gallery: {
    stats: string;
    loading: string;
    errorTitle: string;
    errorDescription: string;
    retry: string;
    empty: string;
    search: {
      placeholder: string;
      clear: string;
      input_label: string;
    };
    filter: {
      selectedLabel: string;
      clearAll: string;
      tagsLabel: string;
      removeTag?: string;
    };
    modal: {
      caseTitle: string;
      sourceLabel: string;
      imagesTitle: string;
      promptsTitle: string;
      promptLabel: string;
      copy: string;
      copied: string;
      copyAria: string;
      descriptionTitle: string;
      notesTitle: string;
    };
  };
  copy: {
    success: string;
    failure: string;
  };
  tools?: {
    ariaLabel: string;
    veo3: string;
    sora2: string;
    wan25: string;
    upscaler: string;
  };
  detail?: {
    backToGallery: string;
    source: string;
    recreateButton: string;
    share: {
      button: string;
      buttonLabel: string;
      copied: string;
      linkCopied: string;
      success: string;
      failed: string;
    };
    sections: {
      prompt: string;
      description: string;
      notes: string;
      relatedPrompts: string;
    };
    navigation: {
      previous: string;
      next: string;
    };
  };
}
