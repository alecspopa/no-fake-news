var publisherList = {
  "com": {
    "nytimes.com": { "status": "trusted" },
    "digitalrev.com": { "status": "trusted" },
    "thenextweb.com": { "status": "trusted" },
    "theguardian.com": { "status": "trusted" },
    "ted.com": { "status": "trusted" },
    "boredpanda.com": { "status": "humor" },
    "theonion.com": { "status": "satire" }
  },
  "ro": {
    "timesnewroman.ro": { "status": "satire" },
    "hotnews.ro": { "status": "trusted" },
    "casepractice.ro": { "status": "fake" },
    "antena3.ro": { "status": "fake" }
  }
}

function cleanupUrl(publisher_url) {
  publisher_tdl = '';
  publisher_main_domain = '';

  if (publisher_url) {
    publisher_domain = publisher_url.split('/')[0];
    publisher_domain_parts = publisher_domain.split('.');

    if (publisher_domain_parts.length >= 2) {
      publisher_tdl = publisher_domain_parts[publisher_domain_parts.length - 1];

      publisher_main_domain = publisher_domain_parts[publisher_domain_parts.length - 2];
      publisher_main_domain += '.';
      publisher_main_domain += publisher_tdl;
    }
  }

  return [publisher_tdl, publisher_main_domain];
}

function tagPublisher(publisher_tdl, publisher_main_domain) {
  publisher_country = publisherList[publisher_tdl];

  if (publisher_country) {
    publisher = publisher_country[publisher_main_domain];

    if (publisher) {
      return publisher.status;
    }
  }

  return 'unknown';
}


$(document).ready(function() {
  console.log('No fake news - plugin is running');

  $('div[role=feed]').on('DOMSubtreeModified', '._4ikz', function() {
    var publisher_el = $(this).find('._6lz._6mb.ellipsis:not(.no-fake-news-mark)');

    var [publisher_tdl, publisher_main_domain] = cleanupUrl(publisher_el.text());
    var publisher_tag = tagPublisher(publisher_tdl, publisher_main_domain);

    if (publisher_tag) {
      publisher_el
        .addClass('no-fake-news-mark')
        .append('<span class="no-fake-news ' + publisher_tag + '">' + publisher_tag + '</span>');
    }
  });
});

