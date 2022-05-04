--Write an Arbitrary instance that tests a property with the following prime numbers:
-- •30% of the primes in the first 1000 primes
-- •30% of the primes in the second 1000 primes
-- •40% of the primes in the third 1000 primes
instance (Integral a, Arbitrary a) => Arbitrary (Prime a) where
    arbitrary = do
    x <- frequency [(30, choose(0, primes !! 999)) -- •30% of the primes in the first 1000 primes
                   ,(30, choose(primes !! 1000, primes !! 1999)) -- •30% of the primes in the second 1000 primes
                   ,(40, choose(primes !! 2000, primes !! 2999))] -- •40% of the primes in the third 1000 primes
