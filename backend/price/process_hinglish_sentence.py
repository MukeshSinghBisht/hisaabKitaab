import spacy
from spacy.matcher import Matcher
# nlp function hinglish

def hinglish_number_mapping(word):
    mapping = {
        "ek": "1",
        "do": "2",
        # Add more mappings for other numbers like "teen" (3), "chaar" (4), etc.
    }
    return mapping.get(word, word)  # Return the mapped value, or the word itself if not found

def hinglish_unit_mapping(word):
    mapping = {
        "kilo": "kg",
        # Add more mappings for other units like "litre" to "L", etc.
    }
    return mapping.get(word, word)  # Return the mapped value, or the word itself if not found


def hinglish_product_mapping(text):
    mapping = {
        "gay ka dudh": "gaay ka dudh",
        # Add more mappings for other product names
    }
    return mapping.get(text, text)  # Return the mapped value, or the text itself if not found


def process_hinglish(sentence):
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(sentence)

    matcher = Matcher(nlp.vocab)
    quantity_patterns = [
        [{"LOWER": {"IN": ["ek", "do"]}}],
        # Add more patterns here for other numbers
    ]
    unit_patterns = [
        [{"LOWER": {"IN": ["kilo"]}}],
        # Add more patterns here for other units
    ]
    product_name_pattern = [
        [{"LOWER": "gay"}, {"LOWER": "ka"}, {"LOWER": "dudh"}]
    ]

    matcher.add("QUANTITY", quantity_patterns)
    matcher.add("UNIT", unit_patterns)
    matcher.add("PRODUCT_NAME", product_name_pattern)

    matches = matcher(doc)

    quantities = []
    units = []
    product_names = []

    for match_id, start, end in matches:
        matched_text = doc[start:end].text
        mapped_value = hinglish_number_mapping(matched_text)  # Map Hinglish words to numbers
        if mapped_value.isdigit():
            quantities.append(mapped_value)
        else:
            mapped_unit = hinglish_unit_mapping(matched_text)  # Map Hinglish units to standard units
            if matched_text == "kilo":
                units.append(mapped_unit)
            else:
                mapped_product = hinglish_product_mapping(matched_text)  # Map Hinglish product names
                product_names.append(mapped_product)

    return quantities, units, product_names

# nlp funciton ends here