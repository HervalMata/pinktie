<?php
declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Collection;

class ProductPhoto extends Model
{
    const BASE_PATH = 'app/public';
    const DIR_PRODUCTS = 'products';
    const PRODUCTS_PATH = self::BASE_PATH . '/' . self::DIR_PRODUCTS;

    protected $fillable = ['file_name', 'product_id'];

    /**
     * @param $productid
     * @return string
     */
    public static function photosPath($productid)
    {
        $path = self::PRODUCTS_PATH;
        return storage_path("{$path}/{$productid}");
    }

    /**
     * @param $product_id
     * @param array $files
     */
    public static function uploadFiles($product_id, array $files)
    {
        $dir = self::photosDir($product_id);
        foreach ($files as $file) {
            $file->store($dir, ['disk' => 'public']);
        }
    }

    /**
     * @param $product_id
     * @return string
     */
    public static function photosDir($product_id)
    {
        $dir = self::DIR_PRODUCTS;
        return "{$dir}/{$product_id}";
    }

    public static function createWithPhotoFiles(int $productId, array $files) : Collection
    {
        self::uploadFiles($productId, $files);
        $photos = self::createPhotosModel($productId, $files);
        return new Collection($photos);
    }

    private static function createPhotosModel(int $productId, array $files) : array
    {
        $photos = [];
        foreach ($files as $file) {
            $photos[] = self::create([
                'file_name' => $file->hashName(),
                'product_id' => $productId
            ]);
            return $photos;
        }
    }

    public function getPhotoUrlAttribute() {
        $path = self::photosDir($this->product_id);
        return asset("storage/{$path}/{$this->file_name}");
    }

    /**
     * @return BelongsTo
     */
    public function product() {
        return $this->belongsTo(Product::class);
    }
}
