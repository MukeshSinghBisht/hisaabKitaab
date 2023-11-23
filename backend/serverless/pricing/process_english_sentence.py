# import spacy
# from spacy.matcher import Matcher

# # nlp function english
# def standardize_unit(text):
#     # Define unit patterns for kg, gm, liter, and milliliter
#     unit_patterns = [
#         [{"LOWER": {"in": ["kg", "kgs", "kilogram", "kilograms", 'kilo']}}],
#         [{"LOWER": {"in": ["g", "gs", "gram", "grams", "gm"]}}],
#         [{"LOWER": {"in": ["liter", "liters", "l"]}}],
#         [{"LOWER": {"in": ["milliliter", "milliliters", "ml", "mL"]}}],
#     ]

#     # Initialize spaCy and Matcher
#     nlp = spacy.load("en_core_web_sm")
#     matcher = Matcher(nlp.vocab)
    
#     # Add unit patterns to the matcher
#     for pattern in unit_patterns:
#         matcher.add("UNIT", [pattern])

#     # Process the text and find matches
#     doc = nlp(text)
#     matches = matcher(doc)

#     # Initialize the standardized unit as None
#     standardized_unit = None

#     # Check if any unit match is found
#     if matches:
#         for match_id, start, end in matches:
#             if nlp.vocab.strings[match_id] == "UNIT":
#                 # Set the standardized unit based on the first match found
#                 if "kg" in doc[start:end].text:
#                     standardized_unit = "kg"
#                 elif "gm" in doc[start:end].text:
#                     standardized_unit = "gm"
#                 elif "liter" in doc[start:end].text:
#                     standardized_unit = "l"
#                 else:
#                     standardized_unit = "ml"
#                 # Break out of the loop after the first match
#                 break

#     # If no unit match is found, use the original text
#     if standardized_unit is None:
#         standardized_unit = text

#     return standardized_unit
    
# def process_english(sentence):
#     # Load the spaCy English language model
#     nlp = spacy.load("en_core_web_sm")

#     # Process the sentence with spaCy
#     doc = nlp(sentence)

#     # Initialize variables to store extracted information
#     quantity = ""
#     unit = ""
#     product = ""
    
#     for token in doc:
#         if token.like_num:
#             quantity = token.text
#         elif token.lower_ in ("kg",'kilo', "g", "grams","gram", "liter", "liters","l", "ml", "mL", "milliliter", "milliliters"):
#             unit = token.text
#         else:
#             product += token.text + " "
    
#     product = product.strip()  # Remove trailing whitespace

#     unit = standardize_unit(unit)
#     # Return the extracted information as a dictionary
#     return quantity, unit, product
# # nlp funciton ends here