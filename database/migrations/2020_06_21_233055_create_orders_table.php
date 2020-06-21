<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->longText('products');
            $table->decimal('totalPrice');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('name');
            $table->string('address');
            $table->foreign('cidade_id')->references('id')->on('cidades');
            $table->string('country')->default('Brasil');
            $table->string('number');
            $table->string('additional')->nullable();
            $table->string('province');
            $table->string('cpf');
            $table->string('telefone')->nullable();
            $table->string('mobile');
            $table->string('trasanctionID');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
