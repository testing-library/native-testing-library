function fuzzyMatches(textToMatch, node, matcher, normalizer) {
  if (typeof matcher === 'boolean' || typeof textToMatch === 'boolean') {
    return textToMatch == matcher;
  }

  if (!textToMatch && textToMatch !== '') {
    return false;
  }

  const normalizedText = normalizer(textToMatch);
  if (typeof matcher === 'string') {
    return normalizedText.toLowerCase().includes(matcher.toLowerCase());
  } else if (typeof matcher === 'function') {
    return matcher(normalizedText, node);
  } else {
    return matcher.test(normalizedText);
  }
}

function matches(textToMatch, node, matcher, normalizer) {
  if (typeof matcher === 'boolean' || typeof textToMatch === 'boolean') {
    return textToMatch === matcher;
  }

  if (!textToMatch && textToMatch !== '') {
    return false;
  }

  const normalizedText = normalizer(textToMatch);
  if (typeof matcher === 'string') {
    return normalizedText === matcher;
  } else if (typeof matcher === 'function') {
    return matcher(normalizedText, node);
  } else {
    return matcher.test(normalizedText);
  }
}

function getDefaultNormalizer({ trim = true, collapseWhitespace = true } = {}) {
  return text => {
    let normalizedText = text;
    normalizedText = trim ? normalizedText.trim() : normalizedText;
    normalizedText = collapseWhitespace ? normalizedText.replace(/\s+/g, ' ') : normalizedText;
    return normalizedText;
  };
}

function makeNormalizer({ trim, collapseWhitespace, normalizer }) {
  if (normalizer) {
    if (typeof trim !== 'undefined' || typeof collapseWhitespace !== 'undefined') {
      throw new Error(
        'trim and collapseWhitespace are not supported with a normalizer. ' +
          'If you want to use the default trim and collapseWhitespace logic in your normalizer, ' +
          'use "getDefaultNormalizer({trim, collapseWhitespace})" and compose that into your normalizer',
      );
    }

    return normalizer;
  } else {
    return getDefaultNormalizer({ trim, collapseWhitespace });
  }
}

export { fuzzyMatches, matches, getDefaultNormalizer, makeNormalizer };
