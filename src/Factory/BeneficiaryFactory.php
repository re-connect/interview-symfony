<?php

namespace App\Factory;

use App\Entity\Beneficiary;
use App\Repository\BeneficiaryRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Beneficiary>
 *
 * @method static            Beneficiary|Proxy createOne(array $attributes = [])
 * @method static            Beneficiary[]|Proxy[] createMany(int $number, array|callable $attributes = [])
 * @method static            Beneficiary|Proxy find(object|array|mixed $criteria)
 * @method static            Beneficiary|Proxy findOrCreate(array $attributes)
 * @method static            Beneficiary|Proxy first(string $sortedField = 'id')
 * @method static            Beneficiary|Proxy last(string $sortedField = 'id')
 * @method static            Beneficiary|Proxy random(array $attributes = [])
 * @method static            Beneficiary|Proxy randomOrCreate(array $attributes = [])
 * @method static            Beneficiary[]|Proxy[] all()
 * @method static            Beneficiary[]|Proxy[] findBy(array $attributes)
 * @method static            Beneficiary[]|Proxy[] randomSet(int $number, array $attributes = [])
 * @method static            Beneficiary[]|Proxy[] randomRange(int $min, int $max, array $attributes = [])
 * @method static            BeneficiaryRepository|RepositoryProxy repository()
 * @method Beneficiary|Proxy create(array|callable $attributes = [])
 */
final class BeneficiaryFactory extends ModelFactory
{
    public function __construct()
    {
        parent::__construct();

        // TODO inject services if required (https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#factories-as-services)
    }

    protected function getDefaults(): array
    {
        return [
            // TODO add your default values here (https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories)
            'name' => self::faker()->firstName(),
        ];
    }

    protected function initialize(): self
    {
        // see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
        return $this
            // ->afterInstantiate(function(Beneficiary $beneficiary): void {})
        ;
    }

    protected static function getClass(): string
    {
        return Beneficiary::class;
    }
}
