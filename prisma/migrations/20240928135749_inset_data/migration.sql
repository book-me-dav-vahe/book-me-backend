BEGIN TRY

BEGIN TRAN;

-- Insert Main Categories
INSERT INTO categories (title, description, createdAt, updatedAt) VALUES
('Hair', 'Hair-related services', GETDATE(), GETDATE()),
('Nails', 'Nail-related services', GETDATE(), GETDATE()),
('Skin', 'Skin treatments', GETDATE(), GETDATE()),
('Makeup', 'Makeup services', GETDATE(), GETDATE()),
('Lashes & Brows', 'Lash and brow services', GETDATE(), GETDATE()),
('Spa & Wellness', 'Wellness and spa treatments', GETDATE(), GETDATE()),
('Waxing & Hair Removal', 'Waxing and hair removal services', GETDATE(), GETDATE()),
('Tattoo & Piercing', 'Tattoo and body piercing services', GETDATE(), GETDATE()),
('Barber Services', 'Men''s grooming and barber services', GETDATE(), GETDATE()),
('Teeth Whitening', 'Teeth whitening and cosmetic dentistry', GETDATE(), GETDATE()),
('Fitness & Nutrition', 'Fitness and nutrition programs', GETDATE(), GETDATE()),
('Bridal & Special Events', 'Bridal and special event packages', GETDATE(), GETDATE()),
('Men''s Grooming', 'Grooming services for men', GETDATE(), GETDATE()),
('Kids'' Services', 'Services for kids', GETDATE(), GETDATE()),
('Holistic & Alternative Therapies', 'Holistic and alternative healing therapies', GETDATE(), GETDATE()),
('Permanent Makeup', 'Permanent makeup treatments', GETDATE(), GETDATE());

-- Insert Subcategories and Map to Categories
INSERT INTO subCategories (title, description, categoryId, createdAt, updatedAt) VALUES
-- Hair Subcategories
('Haircuts', 'Women''s Haircut, Men''s Haircut, Children''s Haircut', 1, GETDATE(), GETDATE()),
('Hair Coloring', 'Highlights, Balayage, Ombre, Full Color', 1, GETDATE(), GETDATE()),
('Blow Dry', 'Blowouts, Styling, Curls', 1, GETDATE(), GETDATE()),
('Hair Treatments', 'Keratin Treatment, Deep Conditioning, Scalp Treatments', 1, GETDATE(), GETDATE()),
('Hair Extensions', 'Tape-in Extensions, Clip-in Extensions, Microbead Extensions', 1, GETDATE(), GETDATE()),
('Hair Styling', 'Updos, Braids, Wedding Hair', 1, GETDATE(), GETDATE()),

-- Nails Subcategories
('Manicure', 'Classic Manicure, Gel Manicure, French Manicure', 2, GETDATE(), GETDATE()),
('Pedicure', 'Classic Pedicure, Gel Pedicure, French Pedicure', 2, GETDATE(), GETDATE()),
('Nail Art', 'Custom Designs, Nail Embellishments', 2, GETDATE(), GETDATE()),
('Nail Extensions', 'Acrylics, Gel Extensions, Dipping Powder', 2, GETDATE(), GETDATE()),
('Nail Care', 'Nail Repair, Cuticle Care', 2, GETDATE(), GETDATE()),

-- Skin Subcategories
('Facials', 'Deep Cleansing, Anti-Aging, Hydrating, Acne Treatment', 3, GETDATE(), GETDATE()),
('Waxing', 'Eyebrow Waxing, Leg Waxing, Brazilian Wax, Bikini Wax', 3, GETDATE(), GETDATE()),
('Microdermabrasion', 'Exfoliating Treatment, Skin Resurfacing', 3, GETDATE(), GETDATE()),
('Laser Treatments', 'Hair Removal, Skin Tightening, Pigmentation Removal', 3, GETDATE(), GETDATE()),
('Chemical Peels', 'Light Peel, Medium Peel, Deep Peel', 3, GETDATE(), GETDATE()),
('Acne Treatments', 'Blue Light Therapy, Extraction, Pimple Treatment', 3, GETDATE(), GETDATE()),
('Microneedling', 'Skin Rejuvenation, Collagen Boosting', 3, GETDATE(), GETDATE()),

-- Makeup Subcategories
('Bridal Makeup', 'Wedding Day Makeup, Bridal Trial, Bridesmaids Makeup', 4, GETDATE(), GETDATE()),
('Event Makeup', 'Prom Makeup, Party Makeup, Photoshoot Makeup', 4, GETDATE(), GETDATE()),
('Everyday Makeup', 'Natural Look, Glam Look', 4, GETDATE(), GETDATE()),
('Makeup Lessons', 'One-on-One Lessons, Group Classes, Makeup for Beginners', 4, GETDATE(), GETDATE()),
('Special Effects Makeup', 'Halloween Makeup, Fantasy Makeup, Stage Makeup', 4, GETDATE(), GETDATE());

-- Insert Services and Link to Subcategories
INSERT INTO services (title, description, subCategoryId, createdAt, updatedAt) VALUES
-- Haircuts Subservices
('Women''s Haircut', 'Haircut for women', 1, GETDATE(), GETDATE()),
('Men''s Haircut', 'Haircut for men', 1, GETDATE(), GETDATE()),
('Children''s Haircut', 'Haircut for children', 1, GETDATE(), GETDATE()),

-- Hair Coloring Subservices
('Highlights', 'Highlighting hair coloring technique', 2, GETDATE(), GETDATE()),
('Balayage', 'Freehand hair coloring for a natural look', 2, GETDATE(), GETDATE()),
('Ombre', 'Hair coloring with a gradient effect', 2, GETDATE(), GETDATE()),
('Full Color', 'Single hair color applied to entire head', 2, GETDATE(), GETDATE()),

-- Manicure Subservices
('Classic Manicure', 'Standard manicure', 7, GETDATE(), GETDATE()),
('Gel Manicure', 'Manicure with gel polish', 7, GETDATE(), GETDATE()),
('French Manicure', 'Manicure with French style tips', 7, GETDATE(), GETDATE()),

-- Pedicure Subservices
('Classic Pedicure', 'Standard pedicure', 8, GETDATE(), GETDATE()),
('Gel Pedicure', 'Pedicure with gel polish', 8, GETDATE(), GETDATE()),
('French Pedicure', 'Pedicure with French style tips', 8, GETDATE(), GETDATE()),

-- Facials Subservices
('Deep Cleansing Facial', 'Facial for deeply cleaning the skin', 13, GETDATE(), GETDATE()),
('Anti-Aging Facial', 'Facial to reduce signs of aging', 13, GETDATE(), GETDATE()),
('Hydrating Facial', 'Facial for dry skin', 13, GETDATE(), GETDATE()),
('Acne Treatment Facial', 'Facial for acne-prone skin', 13, GETDATE(), GETDATE()),

-- Waxing Subservices
('Eyebrow Waxing', 'Waxing for eyebrows', 14, GETDATE(), GETDATE()),
('Leg Waxing', 'Waxing for legs', 14, GETDATE(), GETDATE()),
('Brazilian Wax', 'Waxing for the bikini area', 14, GETDATE(), GETDATE()),
('Bikini Wax', 'Waxing for the bikini line', 14, GETDATE(), GETDATE());

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
